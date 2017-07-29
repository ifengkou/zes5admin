/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('ConsMix', function (Settings, $resource, $log, User) {
      $log.debug("Projects service init,the api url :", Settings.getAPI());
      var stuffs = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/consMixprop/:id', {id: '@id'}, {
          stuffs: {
            method: 'GET',
            url: apiUrl + '/consMixprop/:id/stuffs',
          },
          audit: {
            method: 'PUT',
            url: apiUrl + '/consMixprop/:id/audit',
          }
        });
      };
      _initResource(Settings.getAPI());

      var getStuffs = function (id,callback) {
        return resource.stuffs({id: id,
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
        refresh: function (id) {
          return getStuffs(id,function (response) {
            stuffs = response.data;
          });
        },
        resetData: function () {
          stuffs = [];
        },
        getStuffs: function () {
          return stuffs;
        },
        audit: function (id) {
          return resource.audit({id: id, accesstoken: User.getCurrentUser().token}, null);
        }
      };

    });
})();
