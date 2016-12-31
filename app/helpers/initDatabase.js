var mongoose = require('mongoose')
var config = require('../../config')
var userModel = require('../models/user')  
var users = require('../apis/users')

function createUserIfNotExists(userName, password, isAdmin) {
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
        createUserIfNotExists('user', 'User_123', false)
        createUserIfNotExists('admin', 'Admin_123', true)
    }
};