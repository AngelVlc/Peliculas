var mongoose = require('mongoose');
var config = require('./config'); 
var user = require('./app/models/user'); // get our mongoose model
var initDb = require('./initDb');

mongoose.Promise = global.Promise

mongoose.connect(config.database); // connect to database

initDb.chekUsers();
 
 //to check pass bcrypt.compareSync(myPlaintextPassword, hash);

