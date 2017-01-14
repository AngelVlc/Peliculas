var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var Database = require('./database')



const saltRounds = 10

const hashSecret = process.env.HASH_SECRET

function getPasswordHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRounds)
}


module.exports = {
    createUsesIfNotExists: function (userName, password, isAdmin) {
        var database = new Database();

        database.once('userFound', function (foundUser) {
            if (!foundUser) {
                database.once('userCreated', function (createdUserName) {
                    console.log('User ' + createdUserName + ' created')
                })

                database.insertUser(userName, getPasswordHash(password), isAdmin);
            }
        })

        database.getUserByUserName(userName)
    },
    getToken: function (request, response) {
        var userName = request.body.name
        var plainPassword = request.body.password
        var database = new Database();
        database.once('userFound', function (foundUser) {
            if (!foundUser) {
                response.json({ success: false, message: 'Authentication failed. User not found.' })
                return
            }

            // check if password matches
            if (!bcrypt.compareSync(plainPassword, foundUser.password)) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' })
                return
            }

            var roles = []

            if (foundUser.isAdmin==='1') roles.push('ADMIN')

            var tokenPayload = { name: foundUser.userName, roles }

            var token = jwt.sign(tokenPayload, hashSecret, {
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

        database.getUserByUserName(userName)
    },
    verifyToken: function (request, response, next) {
        // check header or url parameters or post parameters for token
        var token = request.body.token || request.query.token || request.headers['x-access-token']

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, hashSecret, function (err, decoded) {
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
    hasAdminRole: function (request) {
        return request.decoded.roles.indexOf('ADMIN', 0) >= 0
    }
}