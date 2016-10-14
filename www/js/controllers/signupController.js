angular.module('starter.controllers')
.controller('SignupCtrl', function($scope, SignupService, $ionicPopup, $state, $window, $http){
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
    $http.post(urlBaseApi + '/auth/signout',{});
  };
});
