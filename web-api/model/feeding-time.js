var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feddingTimeSchema = new Schema({
  title: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Feeding-time', feddingTimeSchema);