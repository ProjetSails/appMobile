angular.module('starter.services')
.service('ListCamsService', function($q, $http) {
  return {

    addCamera: function() {
      var deferred = $q.defer();
      var promise = deferred.promise;

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
