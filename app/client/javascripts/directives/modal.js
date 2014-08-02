angular.module('speed-dating.directives.modal', []).directive('sdModal', function() {
  return {
    restrict: 'A',
    link: function($scope, element, attr) {
      $scope.dismissModal = function() {
        element.modal('hide');
      };

      element.on('show.bs.modal shown.bs.modal hidden.bs.modal hide.bs.modal loaded.bs.modal', function (event) {
        $scope.$emit([event.type, 'sd.modal'].join('.'));
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });
    }
  }
});