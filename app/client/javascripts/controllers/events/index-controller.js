angular.module('speed-dating.controllers.events.index', ['speed-dating.services.event']).controller('EventsCtrl', ['$scope', 'EventService',
  function($scope, EventService) {

    $scope.event = {
      name: null,
      description: null
    };

    EventService.all().then(function (events) {
      $scope.events = events;
    });

    $scope.createEvent = function createEvent(event) {
      if ($scope.newEvent.$valid) {
        EventService.create(event.name, event.description).then(function () {
          $scope.dismiss();
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