(function () {
    "use strict";

    angular
        .module('reminders')
        .controller('remindersController', ['remindersService', '$location', '$routeParams', '$auth',
        function(remindersService, $location, $routeParams, $auth) {
            var remCtl = this;
            remCtl.isAuthenticated = function () {
              return $auth.isAuthenticated();
            }
            remindersService.getReminders().success(function (reminders) {
                remCtl.reminders = reminders;
            });
            if($routeParams.remId) {
            remindersService.getReminder($routeParams.remId).success(function (reminder) {
                remCtl.reminder = reminder;
            });
          }

            remCtl.createReminder = function (newRem) {
              newRem.phone = localStorage.getItem('phone');
              console.log(newRem);
              remindersService.createReminder(newRem);
                $location.path('/reminders');
            };

            remCtl.editPost = function (post) {
              remindersService.editReminder(post);
                $location.path('/reminders');
            };

            remCtl.deleteReminder = function (id) {
              remindersService.deleteReminder(id);
                $location.path('/reminders');
            }


        }]);
})();
