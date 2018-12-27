const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        unique: 1
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };