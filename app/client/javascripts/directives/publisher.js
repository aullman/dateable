// pass en event as an attribute
angular.module('speed-dating.directives.publisher', []).directive('sdPublisher',
    ['OpenTokService', function (OpenTokService) {
      return {
        restrict: 'E',
        scope: {
          props: '&'
        },
        link: function (scope, element, attrs) {
          var event = attrs.event,
              properties = {
                width: element.width(),
                height: element.height()
              },
              oldChildren = $(element).children();
          scope.publisher = OpenTokService.initPublisher(OpenTokService.API_KEY, element[0], properties);
          $(element).append(oldChildren);

          scope.$on("$destroy", function () {

            if (scope.session) {
              scope.session.unpublish(scope.publisher);
            } else {
              scope.publisher.destroy();
            }

            event.publishers = event.publishers.filter(function (publisher) {
              return publisher !== scope.publisher;
            });

            scope.publisher = null;
          });

          if (event.session
              && (event.session.connected || (event.session.isConnected && event.session.isConnected()))) {
            event.session.publish(scope.publisher);
          }

          event.setPublisher(scope.publisher);
        }
      };
    }])