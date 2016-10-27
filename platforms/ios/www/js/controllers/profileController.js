angular.module('starter.controllers')
.controller('ProfilCtrl', function($scope, ProfileService, $ionicPopup, $http, $window, $ionicModal) {
  $scope.data = {};

  verifLog($scope, $http, $window);

  $http.get(urlBaseApi + '/user/me', {
    headers: {
      'Authorization': 'JWT ' + window.localStorage.getItem('authToken')
    }
  }).success(function(response) {
    $("#usernameField").val(response.username);
    $("#emailField").val(response.email);
  });

  $scope.logOut = function() {
    window.localStorage.setItem('authToken', "");
    $http.post(urlBaseApi + '/auth/signout',{});
  };

  $scope.updateProfile = function() {
    ProfileService.updateProfileInfos($scope.data.username, $scope.data.email, $scope.data.password ,$scope.data.confpassword).success(function(data) {
      //update a fonctionné
      var alertPopup = $ionicPopup.alert({
        title: 'Update Succeeded!',
        template: 'Your informations have been succesfully updated'
      });
    })
    .error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
  };

  $scope.deleteUser = function(){
    ProfileService.deleteUser().success(function(response){
      $scope.closeModal();
      window.localStorage.setItem('authToken', "");
      $window.location.href = '#/login';
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
  };

  $scope.openDeleteModal = function() {
    $scope.openModal();
  };

  $ionicModal.fromTemplateUrl('delete-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
});
