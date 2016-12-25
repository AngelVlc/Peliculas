var mongoose = require('mongoose');
var config = require('./config');
var userModel = require('./app/models/user'); // get our mongoose model

function CreateUserIfNotExists(userName, password, isAdmin) {
    userModel.count({ name: userName }, function (err, count) {
        if (err) throw err;

        if (count === 0) {
            var newUser = new userModel({
                name: userName,
                password: password,
                admin: isAdmin
            });

            newUser.save(function (err, savedUser) {
                if (err) throw err;
                console.log('User ' + savedUser.Name + ' created');
            });
        } else {
            console.log('User "' + userName + '" already exists');
        }
    })
}

module.exports = {
    chekUsers: function () {
        CreateUserIfNotExists('user', 'User_123', false);
        CreateUserIfNotExists('admin', 'Admin_123', true);
    }
};