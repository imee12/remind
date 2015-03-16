var mongoose = require('mongoose');

var reminderSchema = new mongoose.Schema({
  remindThis: String,
  shdlSMS: String,
  isComplete: Boolean,
  phone: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  smsJob: { type: mongoose.Schema.ObjectId, ref: 'smsJob'}
});

var Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
