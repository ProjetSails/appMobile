angular.module('starter.services')
.service('addDeviceService', function($q, $http) {
  return {

    addDevice: function(deviceName, groupId, qrCode) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      var codeCarte = qrCode;

      $http.post(urlBaseApi + '/Device',
      {
        nom: deviceName,
        group: groupId,
        code_carte: codeCarte,
        etat: true
      },
      {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        deferred.resolve(response);
      }).error(function(data, status, headers, config) {
        deferred.reject("Something happened, group couldn't be created");
      });

      promise.success = function(fn) {
        promise.then(fn);
        deferred.resolve(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        deferred.reject('Something went wrong with the app');
        return promise;
      }

      return promise;
    }
  }
});
