angular.module('speed-dating.models.event', []).factory('Event', ['Model', 'OpenTokService', function EventFactory(Model, OpenTokService) {

  /**
   * A speed dating event.
   *
   * @param {Object} attributes
   * @constructor
   */
  var Event = function Event(attributes) {
    this.attributeKeys = ['id', 'name', 'description', 'sessionId', 'createdAt', 'updatedAt', 'streams', 'publisher'];
    this.streams = [];
    this.setAttributes(attributes);
  };

  Event.prototype = _.extend(Model.prototype, {
    /**
     * Initialises and/or returns a session if the event is associated with one.
     *
     * @returns {OT.Session|null}
     */
    getSession: function getSession() {
      if (!this.sessionId) {
        return null;
      }
      if (!this.session) {
        this.session = OpenTokService.initSession(OpenTokService.API_KEY, this.sessionId);
      }
      return this.session;
    },

    initiate: function initiate(token) {
      var session = this.getSession(),
          self = this;
      if (!session) {
        throw 'Cannot initiate an event without a session ID';
      }
      session.on({
        sessionConnected: function(event) {
          session.publish(self.publisher);
        },
        streamCreated: function(event) {
          self.streams.push(event.stream);
        },
        streamDestroyed: function(event) {
          self.streams = _.without(streams, event.stream);
        },
        sessionDisconnected: function(event) {
          self.streams.length = 0;
        }
      });

      session.connect(OpenTokService.API_KEY, token);
      return this;
    },

    setPublisher: function setPublisher(publisher) {
      this.publisher = publisher;
    }

  });

  return Event;
}]);