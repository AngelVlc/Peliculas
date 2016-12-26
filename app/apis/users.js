var userModel = require('../models/user.js')
var authentication = require('../helpers/authentication.js')

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.get('/users', function (request, response) {
            if (authentication.hasAdminRole(request)) {
                userModel.find({}, "name isAdmin", function (err, result) {
                    response.json(result);
                })
            } else {
                response.json({ success: false, message: 'Wrong role.' })
            }
        })
    },
    createUser: function (userName, plainPassword, flagIsAdmin) {
        var newUser = new userModel({
            name: userName,
            password: authentication.getPasswordHash(plainPassword),
            isAdmin: flagIsAdmin
        });

        return newUser
    }
}


