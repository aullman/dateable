// pass en event as an attribute
angular.module('speed-dating.directives.publisher', []).directive('sdPublisher',
    ['OpenTokService', function (OpenTokService) {
      return {
        restrict: 'E',
        scope: {
          event: '='
        },
        link: function (scope, element, attrs) {
          var event = scope.event,
              properties = {
                width: element.width(),
                height: element.height()
              };
          scope.publisher = OpenTokService.initPublisher(OpenTokService.API_KEY, element[0], properties);
          scope.$on("$destroy", function () {
            if (scope.session) {
              scope.session.unpublish(scope.publisher);
            } else {
              scope.publisher.destroy();
            }
            event.publisher = null;
            scope.publisher = null;
          });

          if (event.getSession()
              && (event.getSession().connected
                  || (event.getSession().isConnected && event.getSession().isConnected()))) {
            event.getSession().publish(scope.publisher);
          }
        }
      };
    }])