'use strict';

/* App Module */

var speedDatingApp = angular.module('speedDatingApp', [
  'ngRoute',
//  'speed-dating.controllers.events.index',
  'speed-dating.controllers.events.event'
//  'speed-dating.controllers.date'
//  'speedDatingFilters',
//  'speedDatingServices'
]);

speedDatingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/events', {
          templateUrl: 'partials/events/index',
          controller: 'EventsCtrl'
        })/*.
        when('/event/:eventId', {
          templateUrl: 'partials/events/event',
          controller: 'EventCtrl'
        }).
        when('/event/:eventId/date/:dateId', {
          templateUrl: 'partials/event/date',
          controller: 'DateCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });*/
  }]);