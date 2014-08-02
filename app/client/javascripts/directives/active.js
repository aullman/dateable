angular.module('speed-dating.directives.active', []).directive('sdActive', ['$location', function ($location) {
  return {
    link: function postLink(scope, element, attrs) {
      scope.$on("$routeChangeSuccess", function (event, current, previous) {
        var expression = new RegExp(attrs.sdActive);

        if ($location.path().match(expression) === null) {
          element.removeClass("active");
        }
        else {
          element.addClass("active");
        }
      });
    }
  };
}]);