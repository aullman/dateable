angular.module('speed-dating.controllers.events.event', [])
    .controller('EventCtrl', ['$scope', '$routeParams', 'EventService',
      function ($scope, $routeParams, EventService) {
        $scope.msg = 'You are at a speed dating event.';
        EventService.find(parseInt($routeParams.eventId)).then(function (event) {
          $scope.event = event;
//          event.getSession().connect();
        });
      }]);