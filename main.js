var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var Database = require('./database')
var authentication = require('./authentication')
var apiUsers = require('./apis/users')
var heapdump = require('heapdump')
var path = require('path')

// users initialization
authentication.createUsesIfNotExists('user','User_123',false)
authentication.createUsesIfNotExists('admin','Admin_123',true)

var port = process.env.PORT || 8080 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

//where express looks for the Angular front-end code
app.use(express.static(path.join(__dirname, 'client')));

// =======================
// routes ================
// =======================
// basic route
/*
app.get('/', function (req, res) {    
  res.render(path.join(__dirname + '/index.html'));  
})
*/

app.get('*', function(req, res) {
  //res.render(path.join(__dirname + '/index.html'));  
  res.sendFile(path.join(__dirname + '/client/index.html'));  
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

//apiUsers.configureApi(apiRoutes)



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


 // =======================
// start the server ======
// =======================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)

