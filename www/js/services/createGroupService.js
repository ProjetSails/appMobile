angular.module('starter.services')
.service('createGroupService', function($q, $http) {
  return {

    createGroup: function(groupName) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      $http.post(urlBaseApi + '/group',
      {
        name: groupName
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
