angular.module('starter.controllers')
.controller('HandleCamCtrl', function($scope, ListCamsService, $ionicPopup, $window, $http) {
  $scope.data = {};

  $scope.cameraSelected = {};

  verifLog($scope, $http, $window);

  $scope.$on('$ionicView.enter', function(){
    $scope.cameraSelected = cameraSelected;
  });

  $scope.changeState = function(device){
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/user/me', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response) {
      $http.put(urlBaseApi + '/device/' + device.id, {
        etat: device.etat
      }, {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        //Traiter ici l'activation ou désactiation de la caméra et des boutons
      }).error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Could not change device state.'
        });
      });
    });
  };

  $scope.turnLeft = function(){

  };

  $scope.turnRight = function(){

  };

});
