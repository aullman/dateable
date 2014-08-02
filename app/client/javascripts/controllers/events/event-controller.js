angular.module('speed-dating.controllers.events.event', [])
    .controller('EventCtrl', ['$scope', '$routeParams', 'event',
      function ($scope, $routeParams, event) {
        $scope.msg = 'You are at a speed dating event.';
        $scope.event = event;
      }]);