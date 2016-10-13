angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {

          //Log in success, write to file
          window.localStorage.setItem('authToken', data.token);

          var alertPopup = $ionicPopup.alert({
              title: 'Login succeeded!',
              template: 'You have been logged in, here is your token: ' + data.token
          });
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

    if(window.localStorage.getItem('authToken') != null) {
      LoginService.loginToken(window.localStorage.getItem('authToken')).success(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Already logged!',
            template: 'You are already logged in, thanks to your token'
        });
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Token failed!',
            template: 'Please login again'
        });
      })
    }
});
