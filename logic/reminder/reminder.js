var Reminder = require('../../entities/Reminder');
var shdlr = require('../scheduler/schedule');

var reminder = {

  getAll: function(reminder) {
    return db.getAll(reminder.userId);
  },

  getOne: function(reminder) {
    return db.getOne(reminder.reminderId);
  },
  create: function(reminder) {
    console.log('reminder in create logic', reminder);
    reminder.isCompleted = false;
    var savedReminder = new Reminder(reminder);
    savedReminder.smsJob = shdlr.scheduleSMS(savedReminder);
    savedReminder.save(function () {
      Reminder.find()
        .populate('user')
        .populate('smsJob')
        .exec(function (err, reminders) {
          console.log(reminders);
        });
    });

    return savedReminder;
  },
  cancel: function(reminder) {
    return shdlr.cancelJob(reminder.reminderId);
  },
  delete: function(reminder) {
    // cancel jobs
    shdlr.cancelJob(reminder.reminderId);

    // remove the saved schedules
    require('../../db/db.schedule').deleteJob(reminder.reminderId);

    // delete the reminder
    return db.delete(reminder.reminderId);
  }
};

module.exports = reminder;
