var module = angular.module('starter.controllers', []);

module.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {

          //Log in success, write to file
          window.localStorage.setItem('authToken', data.token);

          $location.path('#/listcams');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

    if(window.localStorage.getItem('authToken') != null && window.localStorage.getItem('authToken') != "") {
      LoginService.loginToken(window.localStorage.getItem('authToken')).success(function(data) {
        //Le token existe déjà et fonctionne
      }).error(function(data) {
        //Le token n'est pas bon
        window.localStorage.setItem('authToken', "");
      })
    } else {
      //Le token n'a pas été trouvé
    }
});

module.controller('SignupCtrl', function($scope, SignupService, $ionicPopup, $state, $ionicHistory){
  $scope.data = {};

    $scope.signup = function() {
        SignupService.signupUser($scope.data.username, $scope.data.email, $scope.data.password ,$scope.data.confpassword).success(function(data) {
          window.localStorage.setItem('authToken', data.data.token);
            //signup a fonctionné
            $location.path('#/listcams');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sign up failed.',
                template: 'Something happened, we couldn\'t create your user'
            });
        });
    };

    $scope.goLogin = function() {
      window.localStorage.setItem('authToken', "");
    };
});
