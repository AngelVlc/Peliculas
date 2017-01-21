var authentication = require('../authentication')
var UsersDataAccess = require('../data_access/users-data-access')
var usersDataAccess = new UsersDataAccess();

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.get('/users/get', function (request, response) {
            if (!authentication.hasAdminRole(request)) {
                response.status(403).send('Wrong role.')
            }

            usersDataAccess.getUsers(function(error, data) {
                if (error) {
                    console.error(error)
                    response.status(500).send('Internal error.')
                }

                response.json(data)
            })            
        })

        apiRoutes.get('/users/get/:id', function (request, response) {
            if (!authentication.hasAdminRole(request)) {
                response.status(403).send('Wrong role.')
            }


        })
    }
}


