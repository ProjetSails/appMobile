angular.module('starter.controllers')
.controller('ListCamsCtrl', function($scope, ListCamsService, $ionicPopup, $window, $http) {
  $scope.data = {};

  verifLog($scope, $http, $window);

  $scope.cams = [];

  $scope.groups = [];

  $scope.getCams = function() {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/device/mine', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response){
      $scope.cams = [];
      angular.forEach(response, function(elt) {
        $scope.cams.push({
          title: elt.nom,
          codeCarte: elt.code_carte,
          etat: elt.etat,
          id: elt.id
        });
      });
    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Devices could not be retrieved.'
      });
    });
  };

  $scope.getGroups = function() {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/user/me', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response){
      var user = response;
      $http.get(urlBaseApi + '/groupuserrole?user=' + user.id, {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(resp){
        $scope.groups = [];
        angular.forEach(resp, function(elt) {
          $scope.groups.push({
            name: elt.group.name,
            id: elt.group.id
          });
        });
      }).error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Groups could not be retrieved.'
        });
      });
    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Something went wrong between the server and you.'
      });
    });
  };

  $scope.addCamera = function() {
    $window.location.href = '#/addDevice';
  };

  $scope.addGroup = function() {
    $window.location.href = '#/createGroup';
  }

  $scope.logOut = function() {
    window.localStorage.setItem('authToken', "");
    $http.post(urlBaseApi + '/auth/signout',{});
  };

  $scope.goProfile = function() {
    $window.location.href = '#/profil';
  };

  $scope.selectCamera = function(device) {
    console.log(device.id + ' - ' + device.etat);
  };

  $scope.selectGroup = function(group) {
    console.log(group.id + ' - ' + group.name);
  };

  $scope.getCams();

  $scope.getGroups();
});
