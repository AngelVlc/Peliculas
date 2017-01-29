var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var Database = require('./database')
var authentication = require('./authentication')
var apiUsers = require('./apis/users')
var apiMasters = require('./apis/masters')
var apiFilms = require('./apis/films')
//var heapdump = require('heapdump')
var path = require('path')

// users initialization
authentication.createUsesIfNotExists('user', 'User_123', false)
authentication.createUsesIfNotExists('admin', 'Admin_123', true)

var port = process.env.PORT || 8080

// disable cache
app.set('etag', false);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

//where express looks for the Angular front-end code
app.use(express.static(path.join(__dirname, 'client')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router()

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', authentication.getToken)

apiRoutes.use(authentication.verifyToken)

apiUsers.configureApi(apiRoutes)

apiMasters.configureApi(apiRoutes, 0)
apiMasters.configureApi(apiRoutes, 1)

apiFilms.configureApi(apiRoutes)

apiRoutes.get('*', function (req, res) {
  return res.status(404).send("Resource not found")
})



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// routes ================
// =======================
// basic route
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
})


// =======================
// start the server ======
// =======================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)