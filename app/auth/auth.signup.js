angular.module('auth')
  .controller('SignupCtrl', function($scope, $alert, $auth) {
    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password,
        phone: $scope.phone
      }).catch(function(response) {
        localStorage.setItem('phone', response.data.phone)
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            $alert({
              content: message[0],
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
        } else {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }
      });
    };
  });
