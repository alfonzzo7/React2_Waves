const express = require('express');

// Models
const { Site } = require('../models/site');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const app = express();

app.get('/api/site/site_data', (req, res) => {
    Site.find({}, (err, site) => {
        if (err) return res.status(400).send(err);

        res.status(200).send(site[0].siteInfo);
    });
});

app.post('/api/site/site_data', auth, admin, (req, res) => {
    Site.findOneAndUpdate(
        { name: 'Site' },
        { '$set': { siteInfo: req.body }},
        { new: true },
        (err, site) => {
        if (err) return res.status(400).send({success: false, err});

        res.status(200).send({
            success: true,
            siteInfo: site.siteInfo
        });
    });
});

module.exports = app;