angular.module('starter.controllers')
.controller('ListCamsCtrl', function($scope, ListCamsService, $ionicPopup, $window, $http) {
  $scope.data = {};

  verifLog($scope, $http, $window);

  $scope.cams = [];

  $scope.getCams = function() {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    /*$http.get(urlBaseApi + '/device/mine', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response){
      $scope.cams = [];
      console.log(response);
    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Devices could not be retrieved.'
      });
    });*/
  };

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
  };

  $scope.logOut = function() {
    window.localStorage.setItem('authToken', "");
    $http.post(urlBaseApi + '/auth/signout',{});
  };

  $scope.goProfile = function() {
    $window.location.href = '#/profil';
  };

  $scope.getCams();
});
