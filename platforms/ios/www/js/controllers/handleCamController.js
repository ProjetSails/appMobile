angular.module('starter.controllers')
  .controller('HandleCamCtrl', function($scope, ListCamsService, $ionicPopup, $window, $http) {
    $scope.data = {};

    $scope.cameraSelected = {};

    $scope.percentage = 20;

    $scope.socket = {};

    verifLog($scope, $http, $window);

    $scope.$on('$ionicView.enter', function() {
      $scope.cameraSelected = cameraSelected;
      $("#rangeValue").val(cameraSelected.angle);

      if (cameraSelected.etat == true) {
        //handle opening video stream and rotation
      }
      $scope.socket = io.sails.connect(urlBaseApi);

      $scope.socket.on('connect', function(msg) {
        //handle socket event
        $scope.socket.get('/camera/index', function() {
          //call a get to subscribe to cameras
        });

        $scope.socket.on('device', function notificationReceivedFromServer(message) {
          if(cameraSelected.id == message.data.id) {
            if (message.data.angle != undefined) {
              $scope.percentage = Math.trunc(message.data.angle / 180 * 100);
              $("#rangeValue").val($scope.percentage);
            }
            if (message.data.etat != undefined) {
              $scope.cameraSelected.etat = message.data.etat;
              if($scope.cameraSelected.etat == false) {
                $("#displayZone").hide();
              } else {
                $("#displayZone").show();
              }
            }
          }
        });
      });
    });

    $scope.$on('$ionicView.leave', function() {
      $scope.socket.disconnect();
    });

    $scope.changeState = function(device) {
      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      $http.get(urlBaseApi + '/user/me', {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        $http.put(urlBaseApi + '/device/' + device.id, {
          etat: device.etat
        }, {
          headers: {
            'Authorization': tokenField
          }
        }).success(function(response) {
          if (cameraSelected.etat == true) {
            //handle opening video stream and rotation
          }
        }).error(function(data, status, headers, config) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Could not change device state.'
          });
        });
      });
    };

    $scope.valueChange = function(device) {
      $scope.percentage = $("#rangeValue").val();
      //handle rotation
      var token = window.localStorage.getItem('authToken');
      var tokenField = 'JWT ' + token;

      $http.get(urlBaseApi + '/user/me', {
        headers: {
          'Authorization': tokenField
        }
      }).success(function(response) {
        $http.put(urlBaseApi + '/device/' + device.id, {
          angle: Math.trunc($scope.percentage * 180 / 100)
        }, {
          headers: {
            'Authorization': tokenField
          }
        })
      }).error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Could not change device range.'
        });
      });
    };

  });
