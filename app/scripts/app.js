'use strict';

/**
 * @ngdoc overview
 * @name beerBeforeLiquorApp
 * @description
 * # beerBeforeLiquorApp
 *
 * Main module of the application.
 */
angular
  .module('beerBeforeLiquorApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'n3-line-chart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
