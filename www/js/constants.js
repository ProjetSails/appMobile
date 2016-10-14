var urlBaseApi = 'https://gestioncameraapi.herokuapp.com';

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
