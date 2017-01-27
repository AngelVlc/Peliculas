var authentication = require('../authentication')
var FilmsDataAccess = require('../data_access/films-data-access')
var filmsDataAccess = new FilmsDataAccess()

var baseUrl = '/searchfilms/'

module.exports = {
    configureApi: function (apiRoutes) {
        apiRoutes.route(baseUrl + ':searchTerm')
            .get(function (request, response) {               

                filmsDataAccess.search(request.params.searchTerm, function (error, data) {
                    if (error) {
                        console.error(error)
                        response.status(500).send('Internal error.')
                        return
                    }

                    response.json(data)
                })
            })
    }
}


