var express = require('express');
var router = express.Router();
var Reminder = require('../entities/Reminder');
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var msg = require('../messages/messages');
var _ = require('lodash');

/*
 |--------------------------------------------------------------------------
 | GET/POST /api/sms/reminder
 |--------------------------------------------------------------------------
 */
router.route('/reminder')
  .all(ensureAuthenticated)
  .get(function (req, res, next) {
    Reminder.find()
      .populate('user')
      .exec(function (err, reminders) {
        if(err) { return next(err); }
        var userReminders = reminders.filter(function (item) {
          console.log('item from filter', item.user._id);
          console.log('user id from middleware', req.user);
          return item.user._id == req.user;
        });
        console.log('user reminders', userReminders);
        return res.status(200).json(reminders);
    });
  })
  .post(function(req, res) {

    var reminder = req.body;
    reminder.userId = req.user;
    reminder.user = req.user;

    var savedReminder = require('../logic/reminder/reminder').create(reminder);
        res.status(200);
        res.json({
          "status": 200,
          "message": msg.remider_newReminderSuccess,
          "reminder": savedReminder
        });

  });
  /*
   |--------------------------------------------------------------------------
   | GET/DELETE /api/sms/reminder/:id
   |--------------------------------------------------------------------------
   */
router.route('/reminder/:id')
  .all(ensureAuthenticated)
  .get(function (req, res) {
    console.log(req.params);
    Reminder.findById(req.params.id)
      .populate('user')
      .exec(function (err, reminder, next) {
      if(err) return next(err);
      res.json(reminder);
    })

  })
  .delete(function (req, res) {
    Reminder.findOneAndRemove(req.params.id, function (err, theone) {
      if(err) res.send({message: 'Could not delete', error: err});
      console.log(theone);
      res.status(200).send({message: 'Successfully Deleted Reminder'});
  });
});

module.exports = router;
