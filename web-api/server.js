var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database, mongod will automatically create a new database if it does not exist
var db = mongoose.connect('mongodb://localhost/baby-app');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.listen(3000, function() {
  console.log("server running and listening to port 3000");
})