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

  return Model;
}]);