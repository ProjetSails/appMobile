var urlBaseApi = 'https://gestioncameraapi.herokuapp.com:443';
//urlBaseApi = 'http://localhost:1337';

var groupSelected = {};

var cameraSelected = {};

var verifLog = function($scope, $http, $window){
  if(window.localStorage.getItem('authToken') != null && window.localStorage.getItem('authToken') != "") {
    var token = window.localStorage.getItem('authToken');
    var tokenField = 'JWT ' + token;
    $http.get(urlBaseApi + '/user/me', {
      headers: {
        'Authorization': tokenField
      }
    }).error(function(data, status, headers, config) {
      $window.location.href = '#/login';
    })
  } else {
    $window.location.href = '#/login';
  }

};
