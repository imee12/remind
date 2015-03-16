var mongoose = require('mongoose');

var smsJobSchema = new mongoose.Schema({
  name: String,
  events: {},
  reminderId: String

});


var smsJob = mongoose.model('smsJob', smsJobSchema);

module.exports = smsJob;
