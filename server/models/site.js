const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    featured: {
        type: Array,
        required: true,
        default: [],
    },
    siteInfo: {
        type: Array,
        required: true,
        default: [],
    },
});

const Site = mongoose.model('Site', siteSchema);

module.exports = { Site };