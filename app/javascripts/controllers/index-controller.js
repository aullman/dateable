'use strict';

angular.module('speed-dating.controllers.index', []).controller('HomeCtrl', ['$scope',
  function($scope) {
    $scope.msg = 'Welcome to speed dating.';
  }]);