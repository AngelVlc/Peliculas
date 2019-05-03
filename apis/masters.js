var authentication = require('../authentication')
var MastersDataAccess = require('../data_access/masters-data-access')
var mastersDataAccess = new MastersDataAccess()


function getBaseUrl (masterType) {
    switch (masterType)
    {
        case 0:
            return '/types/';
            break

        case 1:
            return '/locations/'
            break

        default:
            throw new Error('Invalid master type.')
    }
}

function getTableName (masterType) {
    switch (masterType)
    {
        case 0:
            return 'types';
            break

        case 1:
            return 'locations'
            break

        default:
            throw new Error('Invalid master type.')
    }
}

module.exports = {
    configureApi: function (apiRoutes, masterType) {
        apiRoutes.route(getBaseUrl(masterType) + ':id')
            .get(function (request, response) {
                mastersDataAccess.getById(getTableName(masterType), request.params.id, function (error, data) {
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

                mastersDataAccess.updateItem(getTableName(masterType), request.params.id, request.body.name, request.body.remarks, function (error, data) {
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

                mastersDataAccess.deleteItem(getTableName(masterType), request.params.id, function (error, data) {
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

        apiRoutes.route(getBaseUrl(masterType))
            .get(function (request, response) {
                 mastersDataAccess.getAll(getTableName(masterType), function (error, data) {
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

                mastersDataAccess.insertItem(getTableName(masterType), request.body.name, request.body.remarks, function (error, data) {
                    if (error) {
                        switch (error.code) {
                            case 'ER_DUP_ENTRY':
                                response.status(400).send('Item already exists')
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


