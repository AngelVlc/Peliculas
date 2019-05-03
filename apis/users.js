var authentication = require('../authentication')
var UsersDataAccess = require('../data_access/users-data-access')
var usersDataAccess = new UsersDataAccess()

var baseUrl = '/users/'

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.route(baseUrl + ':id')
            .get(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role')
                    return
                }

                usersDataAccess.getUserById(request.params.id, function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error')
                        return
                    }

                    response.json(data)
                })
            })
            .put(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role')
                    return
                }

                var userName = request.body.userName
                var password = request.body.password
                var isAdmin = request.body.isAdmin

                var hashedPassword = null

                if (password) {
                    hashedPassword = authentication.getPasswordHash(password)
                }

                usersDataAccess.updateUser(request.params.id, userName, hashedPassword, isAdmin, function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error')
                        return
                    }

                    response.json('Updated')
                })
            })
            .delete(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role')
                    return
                }

                usersDataAccess.deleteUser(request.params.id, function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error')
                        return
                    }

                    if (data && data === 1) {
                        response.json('Deleted')
                    } else {
                        response.status(400).send('Didn\'t deleted')
                    }
                })
            })

        apiRoutes.route(baseUrl)
            .get(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role')
                    return
                }

                usersDataAccess.getUsers(function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error')
                        return
                    }

                    response.json(data)
                })
            })
            .post(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role')
                    return
                }

                var userName = request.body.userName
                var password = request.body.password
                var isAdmin = request.body.isAdmin

                var hashedPassword = authentication.getPasswordHash(password)

                usersDataAccess.insertUser(userName, hashedPassword, isAdmin, function (error, data) {
                    if (error) {
                        switch (error.code) {
                            case 'ER_DUP_ENTRY':
                                response.status(400).send('User already exists')
                                break;

                            default:
                                console.error(error)
                                response.status(500).send('Internal error')
                        }

                        return
                    }

                    response.json({ newId: data })
                })
            })


    }
}


