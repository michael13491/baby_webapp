var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventTimeSchema = new Schema({
  title: String,
  date: {type: Date, default: Date()}
});

module.exports = mongoose.model('eventTime', eventTimeSchema);