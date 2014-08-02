angular.module('speed-dating.controllers.events.index', ['speed-dating.services.event']).controller('EventsCtrl', ['$scope', 'EventService',
  function($scope, EventService) {

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
        EventService.create(event.name, event.description).then(function () {
          $scope.dismissModal();
        });
      }
    };

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(event) {

      // check to make sure the form is completely valid
      if ($scope.newEvent.$valid) {
        alert('our form is amazing');
      }

    };

    $scope.msg = 'Here are the speed dating events.';
  }]);