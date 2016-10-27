angular.module('starter.services')
.service('SignupService', function($q, $http) {
  return {
    signupUser: function(name, email, pw, confpw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(pw == confpw){
        $http.post(urlBaseApi + '/auth/signup',
        {
          username: name,
          email: email,
          password: pw
        }).success(function(response) {
          deferred.resolve(response);
        }).error(function(data, status, headers, config) {
          deferred.reject("Something happened, user couldn't be created");
        })

        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
      }else{
        deferred.reject('the passwords doesn\'t match.');
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
      }

      return promise;
    }
  }
});
