angular.module('speed-dating.services.open-tok', []).factory('OpenTokService', ['$window',
  function ($window) {
    return _.extend($window.OT, {
      API_KEY: $window.OPEN_TOK_API_KEY
    });
  }]);