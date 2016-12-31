var mongoose = require('mongoose');

module.exports = mongoose.model('Type', new mongoose.Schema({
    name: String,
    remarks: String
}));