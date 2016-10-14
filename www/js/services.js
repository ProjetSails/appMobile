var module = angular.module('starter.services', []);

module.service('LoginService', function($q, $http) {
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

module.service('SignupService', function($q, $http) {
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

module.service('ListCamsService', function($q, $http) {
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

module.service('ProfileService', function($q, $http) {
  return {
    updateProfileInfos: function(username, email, pw, confpw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      };

      var newPW = "";
      var newUsername = "";
      var newEmail = "";

      if (pw == confpw && pw != "" && pw != undefined && pw != null) {
        newPW = pw;
      } else if (pw != confpw){
        deferred.reject('the passwords doesn\'t match.');
      }

      if (username != "" && username != undefined && username != null) {
        newUsername = username;
      }

      if (email != "" && email != undefined && email != null) {
        newEmail = email;
      }

      if (newUsername == "" && newEmail == "" && newPW == "") {
        deferred.reject('You haven\'t changed a thing');
      }
      else {
        var object = {};
        if (newUsername != "" && newUsername != undefined && newUsername != null) {
          object.username = newUsername;
        }
        if (newEmail != "" && newEmail != undefined && newEmail != null) {
          object.email = newEmail;
        }
        if (newPW != "" && newPW != undefined && newPW != null) {
          object.password = newPW;
        }

        var user = {};

        var token = window.localStorage.getItem('authToken');
        var tokenField = 'JWT ' + token;

        $http.get(urlBaseApi + '/user/me', {
          headers: {
            'Authorization': tokenField
          }
        }).success(function(response) {
          user = response;

          $http.put(urlBaseApi + '/user/' + user.id, object, {
            headers: {
              'Authorization': tokenField
            }
          }).success(function(response) {
            deferred.resolve(response);
          }).error(function(data, status, headers, config) {
            deferred.reject("Something went wrong, update failed.");
          });
        });
      }

      return promise;
    },
    deleteUser: function(){
      var deferred = $q.defer();
      var promise = deferred.promise;

      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      };

      var user = {};

      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      $http.get(urlBaseApi + '/user/me', {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        user = response;

        $http.delete(urlBaseApi + '/user/' + user.id, {
          headers: {
            'Authorization': tokenField
          }
        }).success(function(response) {
          deferred.resolve(response);
        }).error(function(data, status, headers, config) {
          deferred.reject('User couldn\'t be deleted.');
        });
      });

      return promise;
    }
  }
});
