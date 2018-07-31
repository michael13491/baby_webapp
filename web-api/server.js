var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Stolen from web dev course examples
//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

//connect to the database, mongod will automatically create a new database if it does not exist
var db = mongoose.connect('mongodb://localhost/eventTime');

var eventTimeModel = require('./model/eventTime');

// "use" activates middleware, which means before a request reaches here, it goes through the middleware first

//prepare things to be json formatted before we handle it here
app.use(bodyParser.json()); 

//only want to work with array and strings, rejects anything else
app.use(bodyParser.urlencoded({extended: false})); 

// example - removes '/' from /feeding
remove_slash_from_url = function (url) {
  return url.substring(1);
}

get_data_from_db =  function (request, response) {
  console.log(request.url);
  console.log(request.url.substring(1));
  title = remove_slash_from_url(request.url);
  eventTimeModel.find({title: title}, null, {sort: {date: -1}, limit: 3}, function(err, feedingTime) {
    if (err) {
      response.status(500).send("Could not get feeding time from DB");
    } else {
      var feeding_return = [];
      for (var i = 0; i < feedingTime.length; i++) {
        feeding_return[i] = feedingTime[i].date;
      }
      response.status(200).send(feeding_return);
    }
  })
};

set_data_to_db = (request, response) => {
  var feedingTime = new eventTimeModel(); //creating a new mongoose js object
  feedingTime.title = remove_slash_from_url(request.url);
  feedingTime.date = Date();

  console.log("received post request")
  console.log(feedingTime.date)
  feedingTime.save(function(err, savedFeedingTime) {
    if (err) {
      response.status(500).send({error: "could not save feeding time"});
    } else {
      response.status(200).send(savedFeedingTime.date);
    }
  })
};

//testing API call
app.get('/all', function (request, response) {
  eventTimeModel.find({}, function(err, feedingTime) {
    if (err) {
      response.status(500).send("Could not get feeding time from DB");
    } else {
      response.status(200).send(feedingTime);
    }
  })
})

app.get('/feeding', get_data_from_db);
app.post('/feeding', set_data_to_db);

app.get('/poop', get_data_from_db);
app.post('/poop', set_data_to_db);

app.get('/bath', get_data_from_db);
app.post('/bath', set_data_to_db);

app.get('/sleep', get_data_from_db);
app.post('/sleep', set_data_to_db);


app.delete('/feeding', function (request, response) {
  eventTimeModel.findByIdAndRemove({_id: request.body._id}, function(err, deletedFeedingTime) {
    if (err) {
      response.status(500).send({error: "could not delete feeding time"});
    } else {
      response.status(200).send(deletedFeedingTime);
    }
  })
})

app.listen(3000, function() {
  console.log("server running and listening to port 3000");
})