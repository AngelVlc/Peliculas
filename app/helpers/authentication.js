var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var config = require('../../config')
var userModel = require('../models/user.js')


const saltRounds = 10

module.exports = {
    getPasswordHash: function(plainPassword) {
        return bcrypt.hashSync(plainPassword, saltRounds)
    },
    getToken: function (request, response) { 
        var userName = request.body.name
        var plainPassword = request.body.password

        userModel.findOne({ name: userName }, function (err, foundUser) {            
            if (err) throw err

            if (!foundUser) {
                response.json({ success: false, message: 'Authentication failed. User not found.' })
                return
            }

            console.log(foundUser.password)

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
    },
    verifyToken: function(request, response, next) {
        // check header or url parameters or post parameters for token
        var token = request.body.token || request.query.token || request.headers['x-access-token']

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return response.json({ success: false, message: 'Failed to authenticate token.' })
                } else {
                    // if everything is good, save to request for use in other routes
                    request.decoded = decoded
                    next()
                }
            });

        } else {
            // if there is no token
            // return an error
            return response.status(403).send({
                success: false,
                message: 'No token provided.'
            })
        }
    },
    hasAdminRole: function(request) {
        return request.decoded.roles.indexOf('ADMIN', 0) >= 0
    }
}