angular.module('speed-dating.models.event', []).factory('Event', ['Model', 'OpenTokService', function EventFactory(Model, OpenTokService) {

  /**
   * A speed dating event.
   *
   * @param {Object} attributes
   * @constructor
   */
  var Event = function Event(attributes) {
    this.attributeKeys = ['id', 'name', 'description', 'sessionId', 'createdAt', 'updatedAt'];
    this.setAttributes(attributes);
  };

  Event.prototype = _.extend(Model.prototype, {
    /**
     * Initialises and returns a session if the event is associated with one.
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
    }
  });

  return Event;
}]);