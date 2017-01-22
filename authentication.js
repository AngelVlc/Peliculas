var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var UsersDataAccess = require('./data_access/users-data-access')
var usersDataAccess = new UsersDataAccess();

const saltRounds = 10

const hashSecret = process.env.HASH_SECRET

function getPasswordHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRounds)
}

module.exports = {
    getPasswordHash: function  (plainPassword) {
        return getPasswordHash(plainPassword)
    },

    createUsesIfNotExists: function (userName, password, isAdmin) {        
        usersDataAccess.getUserByUserName(userName, function(error, data) {
            if (error) {
                console.error(error)
                response.status(500).send('Internal error.')
            }

            if (!data) {                
                var hashedPassword = getPasswordHash(password)

                usersDataAccess.insertUser(userName, hashedPassword, isAdmin, function(error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error.')
                    }   
                    
                    console.log('User ' + userName + ' with id \'' + data + '\' created')
                })
            }
        })
    },

    getToken: function (request, response) {
        var userName = request.body.name
        var plainPassword = request.body.password
 
        usersDataAccess.getUserByUserName(userName, function(error, foundUser) {
            if (error) {
                console.error(error)
                response.status(500).send('Internal error.')
            }    

              if (!foundUser) {
                response.status(401).send('No existe el usuario.')
                return
            }

            // check if password matches
            if (!bcrypt.compareSync(plainPassword, foundUser.password)) {
                response.status(401).send('Contraseña incorrecta.')
                return
            }

            var roles = []

            if (foundUser.isAdmin===1) roles.push('ADMIN')

            var tokenPayload = { name: foundUser.userName, roles }

            var token = jwt.sign(tokenPayload, hashSecret, {
                expiresIn: '20m' //10m minutes or 60s 60 segs
            });

            // return the information including token as JSON
            response.json({
                token: token,
                roles: roles
            })          
        })
    },
    verifyToken: function (request, response, next) {
        // check header or url parameters or post parameters for token
        var token = request.body.token || request.query.token || request.headers['x-access-token']

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, hashSecret, function (err, decoded) {
                if (err) {
                    console.log(err)
                    return response.status(401).send('Failed to authenticate token: ' + err.message)
                } else {
                    // if everything is good, save to request for use in other routes
                    request.decoded = decoded
                    next()
                }
            });

        } else {
            // if there is no token
            // return an error
            return response.status(403).send('No token provided.')
        }
    },
    hasAdminRole: function (request) {
        return request.decoded.roles.indexOf('ADMIN', 0) >= 0
    }
}