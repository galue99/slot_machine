'use strict';

/**
 * @ngdoc overview
 * @name SlotMachineControl
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// Example to require lodash
// This is resolved and bundled by browserify
//
// var _ = require( 'lodash' );

angular.module( 'SlotMachine', [
  'ionic',
  'ngCordova',
  'ngResource',
  'uiGmapgoogle-maps'
] )

.run( [
  '$ionicPlatform',
  '$stateParams',

  function( $ionicPlatform )
  {


  $ionicPlatform.ready(function() {
    // save to use plugins here
  });

  // add possible global event handlers here

} ] )

.config( [
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',
  '$ionicConfigProvider',
  'uiGmapGoogleMapApiProvider',


  function( $httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider)
  {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');

    // Application routing
    $stateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: 'templates/auth.html',
        controller: 'LoginController'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: "templates/views/login.html",
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.details', {
        url: '/details/{id}/{latitude}/{longitude}',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/detailsPlace.html',
            controller: 'PlacesDetailsController'
          }
        }
      })
      .state('app.list_machine', {
        url: '/list_machine/{id}',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/list_machine.html',
            controller: 'ListMachineController'
          }
        }
      })
      .state('app.list_machine/details', {
        url: '/list_machine/details/{id}',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/details_machine.html',
            controller: 'DetailsMachineController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/auth/login');
  }
] )

// Angular module controllers
//
.controller( 'LoginController',     require( './controllers/loginController'     ) )
.controller( 'MainController',     require( './controllers/mainController'     ) )
.controller( 'HomeController',     require( './controllers/homeController'     ) )
.controller( 'SettingsController', require( './controllers/settingsController' ) )
.controller( 'PlacesDetailsController', require( './controllers/placesDetailsController' ) )
.controller( 'ListMachineController', require( './controllers/listMachineController.js' ) )
.controller( 'DetailsMachineController', require( './controllers/detailsMachineController.js' ) )

// Angular module services
//

.factory( 'MachineService',            require( './services/MachineService'     ) )

;