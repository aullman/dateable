'use strict';

/* App Module */

var speedDatingApp = angular.module('speedDatingApp', [
  'ngRoute',
  'speed-dating.controllers',
  'speed-dating.directives',
  'speed-dating.filters',
  'speed-dating.models',
  'speed-dating.services'
]);

speedDatingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/', {
          redirectTo: '/events'
        })
        .when('/events', {
          templateUrl: 'partials/events/index',
          controller: 'EventsCtrl'
        })
        .when('/events/:eventId', {
          templateUrl: 'partials/events/event',
          controller: 'EventCtrl',
          resolve: {
            event: function ($route, EventService) {
              return EventService.find($route.current.params.eventId).then(function (event) {
                return EventService.join(event).then(function (token) {
                  return event.initiate(token);
                });
              });
            }
          }
        })
        .when('/events/:eventId/dates', {
          templateUrl: 'partials/events/dates/index',
          controller: 'DatesCtrl'
        })
        .when('/events/:eventId/dates/:dateId', {
          templateUrl: 'partials/events/dates/date',
          controller: 'DateCtrl'
        })
        .when('/about', {
          templateUrl: 'partials/about'
        })
        .when('/contact', {
          templateUrl: 'partials/contact'
        })
        .otherwise({
          redirectTo: '/'
        });
  }]);