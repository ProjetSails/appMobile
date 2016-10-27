angular.module('starter.services')
.service('ProfileService', function($q, $http) {
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
