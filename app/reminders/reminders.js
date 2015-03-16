(function () {
    "use strict";

    angular
        .module('reminders', [
            "ngRoute"
        ])
        .config(function ($routeProvider) {
          var checkAuth = function ($q, $location, $auth) {
            var dfd = $q.defer();
            if(!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              dfd.resolve();
            }
            return dfd.promise;
          };
            $routeProvider
                .when('/reminders', {
                    templateUrl: 'reminders/views/list.html',
                    controller: 'remindersController as remCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                })
                .when('/reminders/new', {
                    templateUrl: 'reminders/views/create.html',
                    controller: 'remindersController as remCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                })
                .when('/reminders/:remId', {
                    templateUrl: 'reminders/views/show.html',
                    controller: 'remindersController as remCtl'
                })
                .when('/reminders/:remId/edit', {
                    templateUrl: 'reminders/views/edit.html',
                    controller: 'remindersController as remCtl',
                    resolve: {
                      authenticated: checkAuth
                    }
                });
        });

})();
