(function () {
    "use strict";

    angular
        .module('reminders')
        .factory('remindersService', ['$http', '$rootScope', function ($http, $rootScope) {

            // public service methods
            return {
                getReminders: getReminders,
                getReminder: getReminder,
                createReminder: createReminder,
                editReminder: editReminder,
                deleteReminder: deleteReminder
            };

            function getReminders() {

                return $http.get("api/sms/reminder");
            }

            function getReminder(postId) {
                return $http.get("api/sms/reminder/" + postId);
            }

            function createReminder(newReminder) {
          //  newReminder.shdlSMS = new Date(newReminder.shdlSMS).getTime();
              console.log(newReminder.shdlSMS);
        //    newReminder.shdlSMS.day = new Date(newReminder.shdlSMS.day).getDay();
          //                console.log(newReminder.shdlSMS.day);
            //  newReminder.shdlSMS = new parseInt("newReminder.shdlSMS.time" + "newReminder.shdlSMS.day");
                $http.post("api/sms/reminder", newReminder).then(function (res) {
                    $rootScope.$broadcast("post:added");
                });
            }

            function editReminder(post) {
                $http.put("api/collections/demotiy/" + post._id, post).then(function (res) {
                    $rootScope.$broadcast("post:updated");
                });

            }

            function deleteReminder(remId) {
                $http.delete("api/sms/reminder/" + remId).then(function (res) {
                    $rootScope.$broadcast("reminder:deleted");
                });
            }



        }]);
})();
