// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngCordova',
    'LocalStorageModule',
    'services',
    'login',
    'index',
    'dashboard',
    'notify',
    'notification',
    'myhistory',
    'directive.g+signin',
])

.run(function($ionicPlatform) {
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
    if (window.cordova) {
      if (window.BackgroundGeolocation) {
        BackgroundGeolocationService.configurePlugin(window.BackgroundGeolocation);
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


.state('login', {
        url: '/login',
        templateUrl: 'app/modules/login/view/login.html',
        controller : 'LoginCtrl',
  })
  
    .state('index', {
        url: '/index',
        templateUrl: 'app/modules/index/view/index.html',
        controller: 'indexCtrl'
    })
    .state('index.dashboard', {
        url: '/dashboard',
        views: {
          'index-dashboard': {
            templateUrl: 'app/modules/dashboard/view/dashboard.html',
            controller: 'dashboardCtrl'
          }
        }
  })
  
  .state('index.notify', {
      url: '/notify',
      views: {
        'index-notify': {
            templateUrl: 'app/modules/notify/view/notify.html',
            controller: 'notifyCtrl'
        }
      }
    })
    .state('index.notification', {
      url: '/notifications',
      views: {
        'index-notification': {
            templateUrl: 'app/modules/notification/view/notification.html',
            controller: 'notificationCtrl'
        }
      }
    })

  .state('index.myhistory', {
    url: '/myhistory',
    views: {
      'index-myhistory': {
            templateUrl: 'app/modules/myhistory/view/myhistory.html',
            controller: 'myhistoryCtrl'
      }
    }
  });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $httpProvider.interceptors.push('sessionService');

});
