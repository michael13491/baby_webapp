var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feddingTimeSchema = new Schema({
  title: String,
  date: {type: Date, default: Date()}
});

module.exports = mongoose.model('Feeding-time', feddingTimeSchema);