angular.module('speed-dating.services.event', []).factory('EventService', ['$http', '$q', 'OpenTokService', 'Event',
  function ($http, $q, OpenTokService, Event) {
    var methods = {};

    /**
     * A client-side cache of events.
     *
     * @type {Array}
     */
    var events = [];

    var save = function save(event) {
      var data = event.getAttributes();

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
      return save(new Event({
        name: name,
        description: description
      }));
    };

    methods.find = function find(id) {
      id = parseInt(id);
      return $q.when(_.find(events, function (event) {
        return event.id === id;
      }));
    };

    /**
     * @returns {Array}
     */
    methods.all = function all() {
      return $q.when(events);
    };

    return methods;
  }]);