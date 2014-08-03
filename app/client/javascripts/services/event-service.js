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

    /**
     * @todo Fetch from server if force option given or if not in cache.
     * @param id
     * @returns {Promise}
     */
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
      return $http.get('/api/events').then(function (response) {
        var fetchedEvents = _.map(response.data, function (data) {
          return new Event(data);
        });
        events = _.uniq(events.concat(fetchedEvents), false, 'id');
        return events;
      });
    };

    methods.join = function(event) {
      return $http.post('/api/events/' + event.id + '/tokens', {}).then(function (response) {
        return response.data.token;
      });
    };

    return methods;
  }]);