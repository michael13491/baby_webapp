var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database, mongod will automatically create a new database if it does not exist
var db = mongoose.connect('mongodb://localhost/baby-app');

// "use" activates middleware, which means before a request reaches here, it goes through the middleware first

//prepare things to be json formatted before we handle it here
app.use(bodyParser.json()); 

//only want to work with array and strings, rejects anything else
app.use(bodyParser.urlencoded({extended: false})); 


app.get('/', function (request, response) {
  response.send("into get req!");
})

app.listen(3000, function() {
  console.log("server running and listening to port 3000");
})