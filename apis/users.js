var authentication = require('../authentication')
var Database = require('../database')

var database = new Database();

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.get('/users', function (request, response) {
            if (authentication.hasAdminRole(request)) {
                database.getUsers(function(error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error.')
                    }

                    response.json(data)
                })
            } else {
                response.status(403).send('Wrong role.')
            }
        })
    }
}


