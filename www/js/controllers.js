angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, SignupService, $ionicPopup, $state) {
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
    }


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
})

    .controller('ListCamsCtrl', function($scope, $ionicPopover ) {
        $scope.data = {};

        $scope.cams = [
            { title: 'Camera 1' },
            { title: 'Camera 2' },
            { title: 'Camera 3' },
            { title: 'Camera 4' },
            { title: 'Camera 5' },
            { title: 'Camera 6' },
            { title: 'Camera 7' },
            { title: 'Camera 8' },
            { title: 'Camera 9' },
            { title: 'Camera 10' }
        ];


    })
    .controller('ProfilCtrl', function($scope, $ionicPopover ) {
        $scope.data = {};


    });


