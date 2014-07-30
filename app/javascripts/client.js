'use strict';

/* App Module */

var speedDatingApp = angular.module('speedDatingApp', [
  'ngRoute',
  'speed-dating.controllers.index',
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
        when('/', {
          templateUrl: 'partials/index',
          controller: 'HomeCtrl'
        }).
        when('/events', {
          templateUrl: 'partials/events/index',
          controller: 'EventsCtrl'
        }).
        when('/events/:eventId', {
          templateUrl: 'partials/events/event',
          controller: 'EventCtrl'
        }).
        when('/events/:eventId/dates', {
          templateUrl: 'partials/events/dates/index',
          controller: 'DatesCtrl'
        }).
        when('/events/:eventId/dates/:dateId', {
          templateUrl: 'partials/events/dates/date',
          controller: 'DateCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
  }]);