'use strict';

angular.module('speed-dating.controllers.date', []).controller('DateCtrl', ['$scope', 'Phone',
  function($scope) {
    $scope.msg = 'You are on a date.';
  }]);