(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Tasks', function (Settings, $resource, $log, User) {
      $log.debug("TasksService");
    });
})();
