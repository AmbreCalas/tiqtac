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
  'routeControllers',
  'angular-loading-bar'
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
    .when('/pi/:pi/modify', {
      templateUrl: 'partials/modify-pi.html',
      controller: 'modifyPiCtrl'
    })
    .when('/pi/:pi/fbl/all', {
      templateUrl: '/partials/fbl-list.html',
      controller: 'fblListCtrl'
    })
    .when('/pi/:pi/fbl/add/', {
      templateUrl: '/partials/add-fbl.html',
      controller: 'addFblCtrl'
    })
    .when('/pi/:pi/fbl/:fbl/details', {
      templateUrl: '/partials/fbl-details.html',
      controller: 'fblDetailsCtrl'
    })
    .when('/pi/:pi/fbl/:fbl/modify', {
      templateUrl: '/partials/modify-fbl.html',
      controller: 'modifyFblCtrl'
    })
    .when('/pi/:pi/fbl/:fbl/history', {
      templateUrl: '/partials/fbl-history.html',
      controller: 'fblHistoryCtrl'
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
}]);
