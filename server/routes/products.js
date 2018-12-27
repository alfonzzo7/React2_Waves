const express = require('express');
const mongoose = require('mongoose');

// Models
const { Product } = require('../models/product');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const app = express();

app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({success: false, err});
        
        res.status(200).json({
            success: true,
            article: doc
        });
    });
});

app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === 'array') {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }

    Product
        .find({'_id': {$in:items}})
        .populate('brand')
        .populate('wood')
        .exec((err, docs) => {
            if (err) return res.status(400).send(err);

            return res.status(200).send(docs);
    });
});

app.get('/api/product/articles', (req, res) => {
    let order = req.query.order || 'asc';
    let sortBy = req.query.sortBy || '_id';
    let limit = req.query.limit || '100';
    limit = parseInt(limit);
    let skip = req.query.skip || '0';
    skip = parseInt(skip);

    Product
        .find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((err, docs) => {
            if (err) return res.status(400).send(err);

            return res.status(200).send(docs);
    });
});

module.exports = app;