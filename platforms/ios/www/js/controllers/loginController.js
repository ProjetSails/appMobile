angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $window) {
  $scope.data = {};

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
});
