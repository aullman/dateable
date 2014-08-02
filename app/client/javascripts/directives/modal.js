angular.module('speed-dating.directives.modal', []).directive('sdModal', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.dismiss = function() {
        element.modal('hide');
      };
    }
  }
});