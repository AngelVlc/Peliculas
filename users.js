var userModel = require('./app/models/user')
var authentication = require('./authentication.js')

module.exports = {
    createUser: function (userName, plainPassword, flagIsAdmin) {
        var newUser = new userModel({
            name: userName,
            password: authentication.getPasswordHash(plainPassword),
            admin: flagIsAdmin
        });

        return newUser
    }
};