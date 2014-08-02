angular.module('speed-dating.models.user', []).factory('User', ['Model', function UserFactory(Model) {

  var User = function User(attributes) {
    this.attributeKeys = ['token', 'publishers'];
    this.setAttributes(attributes);
  };

  User.prototype = _.extend(Model.prototype, {

  });

  return User;
}]);