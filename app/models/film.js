var mongoose = require('mongoose');

module.exports = mongoose.model('Film', new mongoose.Schema({
    title: String,
    remarks: String,
    locationId: Number,
    typeID: Number
}));