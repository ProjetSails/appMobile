angular.module('starter.services')
.service('LoginService', function($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http.post(urlBaseApi + '/auth/signin',
      {
        login: name,
        password: pw
      }).success(function(response) {
        deferred.resolve(response);
      }).error(function(data, status, headers, config) {
        deferred.reject('Wrong credentials.');
      })

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    },
    loginToken: function(token) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      $http.get(urlBaseApi + '/user/me', {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        deferred.resolve(response);
      }).error(function(data, status, headers, config) {
        deferred.reject('Wrong credentials.');
      })

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});
