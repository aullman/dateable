angular.module('speed-dating.models.model', []).factory('Model', [function ModelFactory() {

  /**
   * A base class for models.
   *
   * @constructor
   */
  var Model = function Model() {};

  Model.prototype.setAttributes = function (attributes) {
    _.extend(this, _.pick(attributes, this.attributeKeys || []));
    return this;
  };

  Model.prototype.getAttributes = function getAttributes() {
    return _.pick(this, this.attributeKeys || []);
  };

  Model.prototype.getBindings = function getBindings(event) {
    this.subscriptionMap = this.subscriptionMap || {};
    return this.subscriptionMap[event];
  };

  // TODO: If in use, move to mixin
  Model.prototype.on = function on(event, callback) {
    this.getBindings(event).push(callback);
  };

  // TODO: If in use, move to mixin
  Model.prototype.trigger = function trigger(event) {
    var bindings = this.getBindings(event);
    if (_.isArray(bindings)) {
      event = _.isString(event) ? new Event(event) : event;
      _.each(bindings, function (binding) {
        binding(event);
      });
    }
  };

  return Model;
}]);