var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config')
var initDb = require('./app/helpers/initDatabase.js')
var authentication = require('./app/helpers/authentication.js')
var apiUsers = require('./app/apis/users.js')


//configuration
mongoose.Promise = global.Promise
mongoose.connect(config.database) // connect to database

initDb.chekUsers()

var port = process.env.PORT || 8080 // used to create, sign, and verify tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =======================
// routes ================
// =======================
// basic route
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
})

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router()

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', authentication.getToken)

apiRoutes.use(authentication.verifyToken)  

apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' })
})

apiUsers.configureApi(apiRoutes)



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

 // =======================
// start the server ======
// =======================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)

