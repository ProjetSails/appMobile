var module = angular.module('starter.controllers', []);

module.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
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
    };

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
    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'No token',
        template: 'No token found'
      });
    }
});

module.controller('SignupCtrl', function($scope, SignupService, $ionicPopup, $state, $ionicHistory){
  $scope.data = {};

    $scope.signup = function() {
        SignupService.signupUser($scope.data.username, $scope.data.email, $scope.data.password ,$scope.data.confpassword).success(function(data) {

            var alertPopup = $ionicPopup.alert({
                title: 'Sign in succeeded!',
                template: 'You have been register! please now, loggin yourself because the api\'s creator is lazy! :D ' + data.token
            });
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sign in failed..',
                template: data
            });
        });
    };

    $scope.goLogin = function() {
      window.localStorage.getItem('authToken') = null;
    };
});
