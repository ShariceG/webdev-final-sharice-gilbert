const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'dist/webdev-final')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));


// DATABASE CONNECTION
// var dbUrl = 'mongodb://127.0.0.1:27017/webdev_final';
var dbUrl = 'mongodb://heroku_v0vg0lnx:i437ttrsug7l7dqnnp299ae6h@ds145356.mlab.com:45356/heroku_v0vg0lnx';
var mongoose = require('mongoose');
var db = mongoose.connect(dbUrl, {
  useNewUrlParser: true});


require('./data_model/app')(app);
