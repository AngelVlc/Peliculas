var authentication = require('../authentication')
var FilmsDataAccess = require('../data_access/films-data-access')
var filmsDataAccess = new FilmsDataAccess()

var baseUrl = '/films/'

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.route(baseUrl + ':id')
            .get(function (request, response) {
                filmsDataAccess.getById(request.params.id, function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error.')
                        return
                    }

                    response.json(data)
                })
            })
        // .put(function (request, response) {
        //     if (!authentication.hasAdminRole(request)) {
        //         response.status(403).send('Wrong role.')
        //         return
        //     }

        //     var userName = request.body.userName
        //     var password = request.body.password
        //     var isAdmin = request.body.isAdmin

        //     var hashedPassword = null

        //     if (password) {
        //         hashedPassword = authentication.getPasswordHash(password)
        //     }

        //     filmsDataAccess.updateUser(request.params.id, userName, hashedPassword, isAdmin, function (error, data) {
        //         if (error) {
        //             console.error(error)
        //             response.status(500).send('Internal error.')
        //             return
        //         }

        //         response.json('Updated')
        //     })
        // })
        // .delete(function (request, response) {
        //     if (!authentication.hasAdminRole(request)) {
        //         response.status(403).send('Wrong role.')
        //         return
        //     }

        //     filmsDataAccess.deleteUser(request.params.id, function (error, data) {
        //         if (error) {
        //             console.error(error)
        //             response.status(500).send('Internal error.')
        //             return
        //         }

        //         if (data && data === 1) {
        //             response.json('Deleted')
        //         } else {
        //             response.status(400).send('Didn\'t deleted.')
        //         }
        //     })
        // })

        apiRoutes.route(baseUrl)
            .get(function (request, response) {
                if (request.query.title) {
                    filmsDataAccess.searchByTitle(request.query.title, function (error, data) {
                        if (error) {
                            console.error(error)
                            response.status(500).send('Internal error.')
                            return
                        }

                        response.json(data)
                    })
                } else if (request.query.locationId) {
                    filmsDataAccess.getByLocation(request.query.locationId, function (error, data) {
                        if (error) {
                            console.error(error)
                            response.status(500).send('Internal error.')
                            return
                        }

                        response.json(data)
                    })
                } else if (request.query.typeId) {
                    filmsDataAccess.getByType(request.query.typeId, function (error, data) {
                        if (error) {
                            console.error(error)
                            response.status(500).send('Internal error.')
                            return
                        }

                        response.json(data)
                    })
                } else {
                    response.status(400).send('Invalid query.')
                }
            })
            .post(function (request, response) {
                if (!authentication.hasAdminRole(request)) {
                    response.status(403).send('Wrong role.')
                    return
                }

                var title = request.body.title
                var remarks = request.body.remarks
                var typeId = request.body.typeId
                var locationId = request.body.locationId

                filmsDataAccess.insertUser(title, remarks, typeId, locationId, function (error, data) {
                    if (error) {
                        switch (error.code) {
                            case 'ER_DUP_ENTRY':
                                response.status(400).send('Film already exists.')
                                break;

                            default:
                                console.error(error)
                                response.status(500).send('Internal error.')
                        }

                        return
                    }

                    response.json({ newId: data })
                })
            })


    }
}


