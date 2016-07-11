// app.js
'use strict';

/* APPLICATION */
/* "app" application declaration  */
var app = angular.module('app', [
  'routage',
  'ngRoute',
  'ngResource',
  'ngMessages',
  'ui.bootstrap'
]);

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

/* ROUTAGE */
/* Routage module declaration  */
var routage = angular.module('routage', [
  'ngRoute',
  'routeControllers'
]);

/* Routage module controllers declaration  */
var routeControllers = angular.module('routeControllers', []);

/* Routage module configuration  */
routage.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .when('/pi/all', {
      templateUrl: 'partials/pi-list.html',
      controller: 'piListCtrl'
    })
    .when('/pi/add', {
      templateUrl: 'partials/add-pi.html',
      controller: 'addPiCtrl'
    })
    .when('/pi/:pi/fbl/all', {
      templateUrl: '/partials/fbl-list.html',
      controller: 'fblListCtrl'
    })
    .when('/pi/:pi/fbl/add/', {
      templateUrl: '/partials/add-fbl.html',
      controller: 'addFblCtrl'
    })
    .when('/pi/:pi/fbl/:fbl', {
      templateUrl: '/partials/fbl-details.html',
      controller: 'fblDetailsCtrl'
    })
    .when('/pi/:pi/fbl/:fbl/move', {
      templateUrl: '/partials/fbl-move.html',
      controller: 'fblMoveCtrl'
    })
    .when('/notFound', {
      templateUrl: '404.html'
    })
    .otherwise({
      redirectTo: '/notFound'
    });
}
]);
