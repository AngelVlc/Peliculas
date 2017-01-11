var authentication = require('../authentication')

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.get('/users', function (request, response) {
            if (authentication.hasAdminRole(request)) {
                resonse.json({name: 'nnnn'})
            } else {
                response.json({ success: false, message: 'Wrong role.' })
            }
        })
    }
}


