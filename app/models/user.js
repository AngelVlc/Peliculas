// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({ 
    name: String, 
    password: String, 
    isAdmin: Boolean 
}));