const express = require('express');

// Models
const { Brand } = require('../models/brand');
const { Wood } = require('../models/wood');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const app = express();

//=============================================================
// BRANDS
//=============================================================

app.post('/api/category/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) return res.json({success: false, err});
        
        res.status(200).json({
            success: true,
            brand: doc
        });
    });
});

app.get('/api/category/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            success: true,
            brands
        });
    });
});

//=============================================================
// WOODS
//=============================================================

app.post('/api/category/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if (err) return res.json({success: false, err});
        
        res.status(200).json({
            success: true,
            wood: doc
        });
    });
});

app.get('/api/category/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            success: true,
            woods
        });
    });
});

module.exports = app;