angular.module('starter.controllers')
.controller('manageGroupCtrl', function($scope, ProfileService, $ionicPopup, $ionicModal, $http, $window, $ionicModal) {
  $scope.data = {};

  $scope.group = {};

  $scope.users = [];

  $scope.allUsers = [];

  verifLog($scope, $http, $window);

  $scope.getInfos = function() {
    $scope.group = groupSelected;

    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/groupuserrole?group=' + $scope.group.id, {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(resp){
      $scope.users = [];
      angular.forEach(resp, function(elt) {
        $scope.users.push({
          username: elt.user.username,
          email: elt.user.email,
          isAdmin: elt.isAdmin,
          idUsr: elt.user.id,
          idEnt: elt.id
        });
      });
    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Users could not be retrieved.'
      });
    });
  };

  $scope.getInfos();

  $scope.changeAdmin = function(userId, isOrNot, idEntity) {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.put(urlBaseApi + '/groupuserrole/' + idEntity, {
      isAdmin: isOrNot
    }, {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response) {

    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'User\'s role could not be changed.'
      });
    });
  };

  $scope.openAddUserModal = function() {

    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/user', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(resp){
      $scope.allUsers = [];
      angular.forEach(resp, function(elt) {
        var shouldBeAdded = true;
        angular.forEach($scope.users, function(usr) {
          if (usr.idUsr == elt.id) {
            shouldBeAdded = false;
          }
        });
        if (shouldBeAdded) {
          $scope.allUsers.push({
            username: elt.username,
            email: elt.email,
            id: elt.id
          });
        }
      });
    }).error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'Users could not be retrieved.'
      });
    });
    $scope.openModal();
  };

  $ionicModal.fromTemplateUrl('users-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalUser = modal;
  });

  $scope.openModal = function() {
    $scope.modalUser.show();
  };

  $scope.closeModal = function() {
    $scope.modalUser.hide();
  };

  $scope.removeUser = function(idEnt){
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/user/me', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response) {
      $http.delete(urlBaseApi + '/groupuserrole/' + idEnt, {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        $scope.getInfos();
      }).error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'User could not be removed from group.'
        });
      });
    });
  };

  $scope.addToGroup = function(user, group) {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;

    $http.get(urlBaseApi + '/user/me', {
      headers: {
        'Authorization': tokenField
      }
    }).success(function(response) {
      $http.post(urlBaseApi + '/groupuserrole', {
        group: group.id,
        user: user.id,
        isAdmin: false
      }, {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        $scope.closeModal();
        $scope.getInfos();
      }).error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'User could not be added to group.'
        });
      });
    });
  };
});
