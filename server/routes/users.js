const express = require('express');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');
const SHA1 = require('crypto-js/sha1');
const moment = require('moment');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Models
const { User } = require('../models/user');
const { Product } = require('../models/product');
const { Payment } = require('../models/payment');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const { sendEmail } = require('../utils/mail/index');

const app = express();

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
    });
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({success: false, err});

        sendEmail(doc.email, doc.name, null, 'welcome');
        
        return res.status(200).json({
            success: true,
            // userdata: doc
        });
    });
});

app.post('/api/users/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({loginSuccess: false, message: 'Auth failes, email not found'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: 'Auth failes, wrong password'});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                });
            });
        });
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({'_id': req.user._id}, {token: ''}, (err, doc) => {
        if (err) return res.json({success: false, err});
        
        return res.status(200).send({
            success: true
        });
    });
});

app.post('/api/users/forgot_password', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({loginSuccess: false, message: 'Email not found'});

        user.generateResetToken((err, user) => {
            if (err) return res.json({success: false, err});

            sendEmail(user.email, user.name, null, 'reset_password', user);

            return res.status(200).send({
                success: true
            });
        });
    });
});

app.post('/api/users/reset_password', (req, res) => {
    var today = moment().startOf('day').valueOf();

    User.findOne({
        'resetToken': req.body.resetToken, 
        'resetTokenExp': {$gte: today}
    }, (err, user) => {
        if (!user) return res.json({success: false, message: 'Sorry the token is invalid, generate a new one.'});

        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExp = '';

        user.save((err, doc) => {
            if (err) return res.json({success: false, err});

            return res.status(200).send({
                success: true
            });
        });
    });
});

app.post('/api/users/uploadImage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });
    }, {
        public_id: `${Date.now()}-waves`,
        resource_type: 'auto'
    });
});

app.get('/api/users/removeImage', auth, admin, (req, res) => {
    let public_id = req.query.public_id;
    cloudinary.uploader.destroy(public_id, (result, error) => {
        if (error) return res.status(500).json({success: false, error});

        res.status(200).send({
            success: true
        });
    });
});

app.post('/api/users/addToCart', auth, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        let duplicate = false;

        user.cart.forEach(product => {
            if (product.id == req.query.productId) {
                console.log('Duplicate');
                duplicate = true;
            }
        });

        if (duplicate) {
            User.findOneAndUpdate(
                {_id: req.user._id, 'cart.id': mongoose.Types.ObjectId(req.query.productId)}, 
                { $inc: { 'cart.$.quantity': 1 }},
                { new: true },
                (err, user) => {
                    if (err) return res.json({sucess: false, err});

                    res.status(200).json(user.cart);
            });
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id}, 
                { $push: { cart: {
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity: 1,
                    date: Date.now()
                }}},
                { new: true },
                (err, user) => {
                    if (err) return res.json({sucess: false, err});

                    res.status(200).json(user.cart);
            });
        }
    });
});

app.get('/api/users/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        { '$pull':
            { 'cart': {'id': mongoose.Types.ObjectId(req.query.productId)}}
        },
        {new: true},
        (err, user) => {
            let cart = user.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
            });

            Product.find({'_id': { $in: array}}).
                populate('brand').
                populate('wood').
                exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                });
    });
});

app.post('/api/users/successBuy', auth, (req, res) => {
    let history = [];
    let transData = [];

    const date = new Date();
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(req.user._id).toString().substring(0,8)}`;

    //user history
    req.body.cartDetail.forEach(item => {
        history.push({
            porder: po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        });
    });

    //payments dash
    transData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
    }
    transData.data = {
        ...req.body.paymentData,
        porder: po
    };
    transData.products = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history:history }, $set: { cart:[] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({success: false, err});

            const payment = new Payment(transData);
            payment.save((err, doc) => {
                if (err) return res.json({success: false, err});

                let products = [];
                doc.products.forEach(item => {
                    products.push({
                        id: item.id,
                        quantity: item.quantity
                    })
                })

                async.eachSeries(
                    products,
                    (item, callback) => {
                        Product.update(
                            { _id: item.id },
                            { $inc: { 'sold': item.quantity }},
                            { new: false },
                            callback
                        )
                    },
                    (err) => {
                        if (err) return res.json({success: false, err});

                        // Send the email
                        sendEmail(user.email, user.mail, null, 'purchase', transData);

                        res.status(200).json({
                            success: true,
                            cart: user.cart,
                            cartDetail: []
                        });
                    });
            })
        }
    )
});

app.post('/api/users/updateProfile', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { '$set': req.body },
        { new: true },
        (err, user) => {
            if (err) return res.json({success: false, err});

            res.status(200).json({
                success: true
            });
        }

    )
});

const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({storage}).single('file');

app.post('/api/users/uploadFile', auth, admin, (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(500).json({success: false, err});

        res.status(200).send({
            success: true
        });
    });
});

const fs = require('fs');
const path = require('path');

app.get('/api/users/files', auth, admin, (req, res) => {
    const dir = path.resolve('.')+'/uploads/';
    fs.readdir(dir, (err, items) => {
        if (err) return res.status(500).json({err});

        res.status(200).send({
            items
        });
    });
});

app.get('/api/users/download/:id', auth, admin, (req, res) => {
    const file = path.resolve('.')+`/uploads/${req.params.id}`; 

    res.download(file);
});

app.get('/api/users/deleteFile/:id', auth, admin, (req, res) => {
    const dir = path.resolve('.')+`/uploads/${req.params.id}`;
    
    fs.unlink(dir, (err) => {
        if (err) return res.status(500).json({err});

        res.status(200).send({
            success: true
        });
    });
});

module.exports = app;