var authentication = require('../authentication')
var Database = require('../database')

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.get('/users', function (request, response) {
            if (authentication.hasAdminRole(request)) {
                var database = new Database();

                database.once('usersGot', function (users) {
                    response.json(users)
                })

                database.getUsers()
            } else {
                response.status(403).send('Wrong role.')
            }
        })
    }
}


