'use strict';

/**
 * @see http://stackoverflow.com/a/21653981/572011
 */
angular.module('speed-dating.filters.partition', []).filter('partition', function () {
  var cache = {};
  return function (arr, size) {
    if (!arr) {
      return arr;
    }
    var partitioned = [];
    for (var i = 0; i < arr.length; i += size) {
      partitioned.push(arr.slice(i, i + size));
    }
    var serialized = JSON.stringify(arr);
    var fromCache = cache[serialized + size];
    if (JSON.stringify(fromCache) === JSON.stringify(partitioned)) {
      return fromCache;
    }
    cache[serialized + size] = partitioned;
    return partitioned;
  };
});