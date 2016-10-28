// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'videosharing-embed']);

io.sails.autoConnect = false;
io.sails.useCORSRouteToGetCookie = false;
io.sails.url = urlBaseApi;

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      resolve: {
        testToken: function(LoginService, $window, $state) {
          if(window.localStorage.getItem('authToken') != null && window.localStorage.getItem('authToken') != "") {
            LoginService.loginToken(window.localStorage.getItem('authToken')).success(function(data) {
              //Le token existe déjà et fonctionne
              $state.go('listcams');
            }).error(function(data) {
              //Le token n'est pas bon
              window.localStorage.setItem('authToken', "");
            })
          } else {
            //Le token n'a pas été trouvé
          }
        }
      },
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
    })
    .state('listcams', {
      url: '/listcams',
      templateUrl: 'templates/listcams.html',
      controller: 'ListCamsCtrl'
    })
    .state('profil', {
      url: '/profil',
      templateUrl: 'templates/profil.html',
      controller: 'ProfilCtrl'
    }).state('createGroup', {
      url: '/createGroup',
      templateUrl: 'templates/createGroup.html',
      controller: 'createGroupCtrl'
    }).state('addDevice', {
      url: '/addDevice',
      templateUrl: 'templates/addDevice.html',
      controller: 'addDeviceCtrl'
    }).state('manageGroup', {
      url: '/manageGroup',
      templateUrl: 'templates/manageGroup.html',
      controller: 'manageGroupCtrl'
    }).state('handleCam', {
      url: '/handleCam',
      templateUrl: 'templates/handleCam.html',
      controller: 'HandleCamCtrl'
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
