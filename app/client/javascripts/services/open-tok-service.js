angular.module('speed-dating.services.open-tok', []).factory('OpenTokService', ['$window',
  function ($window) {
    return $window.OT;
  }]);