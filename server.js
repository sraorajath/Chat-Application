const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const http = require('http')
const io = require('socket.io').listen(app.listen(8080))
const router = express.Router()
require('./config.json')
require('./config/db')
const api = require('./api/api')(router, io)
require('babel-core/register')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')))
app.use('/views', express.static(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CSS
app.use('/bootstrap.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap.min.css')))
app.use('/bootstrap-theme.css', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/css/bootstrap-theme.min.css')))

// JS
app.use('/angular.js', express.static(path.join(__dirname, 'bower_components/angular/angular.min.js')))
app.use('/angular-ui-router.js', express.static(path.join(__dirname, 'bower_components/angular-ui-router/release/angular-ui-router.min.js')))
app.use('/bootstrap.js', express.static(path.join(__dirname, '/bower_components/bootstrap/dist/js/bootstrap.min.js')))
app.use('/jquery.js', express.static(path.join(__dirname, '/bower_components/jquery/dist/jquery.min.js')))
app.use('/socket.js', express.static(path.join(__dirname, '/bower_components/socket.io-client/dist/socket.io.js')))

app.get('/', function(req, res) {
  res.render('index.html.ejs')
})

app.use('/api/v1/', router)

console.log("Server started on port 8080")
// http.listen(8080, function() {
//   console.log("Server started at port 8080")
// })
