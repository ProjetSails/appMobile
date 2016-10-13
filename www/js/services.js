angular.module('starter.services', [])

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

            $http.get(urlBaseApi + '/user/me', {
              headers: {
                'Authorization': 'JWT ' + token
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
})

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
                        deferred.reject('The api\'s builder suck!!');
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
                deferred.reject('the passwords don\'t match.');
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
            }

            return promise;
        }
    }
})

.service('ListCamsService', function($q, $http) {
    return {
        getListCams: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;

            return promise;
        }
    }
});
