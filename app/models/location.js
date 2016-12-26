var mongoose = require('mongoose');

module.exports = mongoose.model('Location', new mongoose.Schema({
    name: String,
    remarks: String
}));