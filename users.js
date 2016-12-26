var userModel = require('./app/models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); 

const saltRounds = 10;

module.exports = {
    createUser: function (userName, plainPassword, flagIsAdmin) {
        var newUser = new userModel({
            name: userName,
            password: bcrypt.hashSync(plainPassword, saltRounds),
            admin: flagIsAdmin
        });

        return newUser;
    },
    getToken: function (userName, plainPassword, response) { 
        userModel.findOne({ name: userName }, function (err, foundUser) {
            if (err) throw err;

            if (!foundUser) {
                response.json({ success: false, message: 'Authentication failed. User not found.' });
            }

            // check if password matches
            if (!bcrypt.compareSync(plainPassword, foundUser.password)) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
           
            var roles = ['USER'];

            if (foundUser.isAdmin) {
                roles.push('ADMIN');
            }

            var tokenPayload = { name: foundUser.name, roles }            

            var token = jwt.sign(tokenPayload, config.secret, {
                expiresIn: 10 * 60000 // expires in 10 minutes
            });

            // return the information including token as JSON
            response.json({
                success: true,
                message: 'Authenticated!',
                token: token,
                roles: roles
            });
        });
    }
};