angular.module('starter.controllers')
.controller('createGroupCtrl', function($scope, createGroupService, $ionicPopup, $window, $http) {
  $scope.data = {};

  verifLog($scope, $http, $window);

  $scope.createGroup = function() {
    createGroupService.createGroup($scope.data.groupName).success(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Group Created!',
        template: 'Your group has been succesfully created!'
      });
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
  };
});
