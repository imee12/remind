// var schDB = require('../../db/db.schedule');
// var remDB = require('../../db/db.reminder');
var Reminder = require('../../entities/Reminder');
var Job = require('../../entities/smsJob');
var tSMS = require('../twilio/triggerSMS');
var tCall = require('../twilio/triggerCall');

var schedule = require('node-schedule');

var scheduler = {

  scheduleSMS: function(reminder) {

    var job = schedule.scheduleJob('job_sms_' + reminder._id, new Date(parseInt(reminder.shdlSMS)), function() {
    console.log(job);
      console.log('sms triggered', reminder);
      tSMS.triggerSMS(reminder);

    });
    job.reminderId = reminder._id; // Tag the job with a reminder ID
    var newJob = new Job(job);
    return newJob.save();
  },

  cancelJob: function(reminderId) {
    var jobs = schedule.scheduledJobs;

    var smsJob = jobs["job_sms_" + reminderId];
    var callJob = jobs["job_call_" + reminderId];

    if (smsJob) {
      smsJob.cancel();
    }
    if (callJob) {
      callJob.cancel();
    }
    return true;
  }
}

module.exports = scheduler;
