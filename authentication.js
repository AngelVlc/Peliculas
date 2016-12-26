var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var config = require('./config')
var userModel = require('./app/models/user')


const saltRounds = 10

module.exports = {
    getPasswordHash: function(plainPassword) {
        return bcrypt.hashSync(plainPassword, saltRounds)
    },
    getToken: function (userName, plainPassword, response) { 
        userModel.findOne({ name: userName }, function (err, foundUser) {            
            if (err) throw err

            if (!foundUser) {
                response.json({ success: false, message: 'Authentication failed. User not found.' })
                return
            }

            // check if password matches
            if (!bcrypt.compareSync(plainPassword, foundUser.password)) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' })
                return
            }
           
            var roles = ['USER']

            if (foundUser.isAdmin) roles.push('ADMIN')

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
            })
        })
    }
}