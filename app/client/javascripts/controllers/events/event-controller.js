angular.module('speed-dating.controllers.events.event', [])
    .controller('EventCtrl', ['$scope', '$routeParams', '$location', 'event',
      function ($scope, $routeParams, $location, event) {
        if (!event) {
          $location.path('/');
        } else {
          $scope.event = event;
        }
      }]);