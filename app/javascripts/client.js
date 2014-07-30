'use strict';

/* App Module */

var speedDatingApp = angular.module('speedDatingApp', [
  'ngRoute',
  'speed-dating.controllers.events.index',
  'speed-dating.controllers.events.event',
  'speed-dating.controllers.events.dates.index',
  'speed-dating.controllers.events.dates.date'
//  'speedDatingFilters',
//  'speedDatingServices'
]);

speedDatingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/events', {
          templateUrl: 'partials/events/index',
          controller: 'EventsCtrl'
        }).
        when('/events/:eventId', {
          templateUrl: 'partials/events/event',
          controller: 'EventCtrl'
        }).
        when('/event/:eventId/dates', {
          templateUrl: 'partials/event/date',
          controller: 'DateCtrl'
        }).
        when('/event/:eventId/dates/:dateId', {
          templateUrl: 'partials/event/date',
          controller: 'DateCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
  }]);