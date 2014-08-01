angular.module('speed-dating.services.event', []).factory('EventService', ['$http', '$q', 'OpenTokService',
  function ($http, $q, OpenTokService) {
    var methods = {};

    /**
     * A client-side cache of events.
     * @type {Array}
     */
    var events = [];

    var save = function save(event) {
      var properties = ['name', 'description'],
          data = _.pick(event, properties);

      if (_.isNumber(event.id)) {
        return $http.put('/api/events/' + event.id, data).then(function (savedEvent) {
          _.extend(event, savedEvent);
          return event;
        });
      } else {
        return $http.post('/api/events', data).then(function (response) {
          _.extend(event, response.data);
          events.push(event);
          return event;
        });
      }
    };

    methods.create = function create(name, description) {
      var event = {
        name: name,
        description: description
      };

      return save(event).then(function (event) {
        event.session = OpenTokService.initSession(OPEN_TOK_API_KEY, event.sessionId);
        return event;
      });
    };

    /**
     * @returns {Array}
     */
    methods.all = function all() {
      return $q.when(events);
    };

    return methods;
  }]);