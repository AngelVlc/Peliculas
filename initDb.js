var mongoose = require('mongoose')
var config = require('./config')
var userModel = require('./app/models/user')  
var users = require('./users')

function CreateUserIfNotExists(userName, password, isAdmin) {
    userModel.count({ name: userName }, function (err, count) {
        if (err) throw err

        if (count === 0) {
            var newUser = users.createUser(userName, password, isAdmin)            

            newUser.save(function (err, savedUser) {
                if (err) throw err
                console.log('User ' + savedUser.name + ' created')
            });
        } 
    })
}

module.exports = {
    chekUsers: function () {
        CreateUserIfNotExists('user', 'User_123', false)
        CreateUserIfNotExists('admin', 'Admin_123', true)
    }
};