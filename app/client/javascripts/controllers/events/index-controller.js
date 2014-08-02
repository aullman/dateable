angular.module('speed-dating.controllers.events.index', ['speed-dating.services.event'])
    .controller('EventsCtrl', ['$scope', '$location', 'EventService',
      function ($scope, $location, EventService) {

        var resetModal = function resetModal() {
          $scope.event = {
            name: null,
            description: null,
            creating: false
          };
          if ($scope.newEvent) {
            $scope.newEvent.$setPristine();
          }
        };
        resetModal();
        $scope.$on('hidden.sd.modal', resetModal);

        EventService.all().then(function (events) {
          $scope.events = events;
        });

        $scope.createEvent = function createEvent(event) {
          if ($scope.newEvent.$valid) {
            event.creating = true;
            EventService.create(event.name, event.description).then(function (event) {
              $scope.dismissModal();
              $scope.$on('hidden.sd.modal', function () {
                $location.path('/events/' + event.id);
              });
            });
          }
        };

        $scope.msg = 'Here are the speed dating events.';
      }]);