const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        unique: 1
    }
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = { Wood };