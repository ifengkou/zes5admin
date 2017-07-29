(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Silos', function (Settings, $resource, $log, User) {
      $log.debug("SiloService");
      var silos = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/silos/:id', {id: '@id'}, {
          query: {
            method: 'get',
            url: apiUrl + '/silos',
            timeout: 2000
          }
        });
      };
      _initResource(Settings.getAPI());

      var getSilos = function (callback) {
        return resource.query({
          accesstoken: User.getCurrentUser().token,
        }, function (r) {
          return callback && callback(r);
        }, function (e) {
          $log.debug(e);
        });
      };

      return {
        initResource: function (url) {
          _initResource(url);
        },
        refresh: function () {
          return getSilos(function (response) {
            silos = response.data;
          });
        },
        resetData: function () {
          silos = [];
        },
        getSilos: function () {
          return silos;
        }
      };
    });
})();
