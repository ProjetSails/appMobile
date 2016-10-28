angular.module('starter.controllers')
  .controller('addDeviceCtrl', function($scope, addDeviceService, $ionicPopup, $window, $http, $cordovaBarcodeScanner) {
    $scope.data = {};

    $scope.groups = [];

    verifLog($scope, $http, $window);

    $scope.scanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $scope.data.qrCode = imageData.text;
        console.log(imageData);
      }, function(error) {
        console.log("an error happend " + error);
      });
    };

    $scope.addDevice = function() {
      addDeviceService.addDevice($scope.data.deviceName, $scope.data.group, $scope.data.qrCode).success(function(data) {
        $window.location.href = '#/listCams';
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: data
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
      }).success(function(response) {
        var user = response;
        $http.get(urlBaseApi + '/groupuserrole?user=' + user.id, {
          headers: {
            'Authorization': tokenField
          }
        }).success(function(resp) {
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

    $scope.getGroups();
  });
