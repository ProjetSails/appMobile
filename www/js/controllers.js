var module = angular.module('starter.controllers', []);

module.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $window) {
  $scope.data = {};

  $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {

          //Log in success, write to file
          window.localStorage.setItem('authToken', data.token);

          $window.location.href = '#/listcams';
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
        $window.location.href = "#/listcams"
      }).error(function(data) {
        //Le token n'est pas bon
        window.localStorage.setItem('authToken', "");
      })
    } else {
      //Le token n'a pas été trouvé
    }
});

module.controller('SignupCtrl', function($scope, SignupService, $ionicPopup, $state, $window){
  $scope.data = {};

    $scope.signup = function() {
        SignupService.signupUser($scope.data.username, $scope.data.email, $scope.data.password ,$scope.data.confpassword).success(function(data) {
          window.localStorage.setItem('authToken', data.data.token);
            //signup a fonctionné
            $window.location.href = '#/listcams';
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

module.controller('ListCamsCtrl', function($scope, ListCamsService, $ionicPopup, $window ) {
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

    $scope.addCamera = function() {
        ListCamsService.addCamera().success(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: 'No camera to add'
            });
        }).error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Token failed!',
                template: data
            });
        })
    }

    $scope.logOut = function() {
      window.localStorage.setItem('authToken', "");
    };

    $scope.goProfile = function() {
      $window.location.href = '#/profil';
    };
});

module.controller('ProfilCtrl', function($scope, $ionicPopover ) {
    $scope.data = {};
});
