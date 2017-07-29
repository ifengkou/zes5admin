/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('ConsMixs', function (Settings, $resource, $log, User) {
      $log.debug("ConsMixs service init,the api url :", Settings.getAPI());
      var consmixs = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/consMixprop/:id', {id: '@id'}, {
          query: {
            method: 'get',
            url: apiUrl + '/consMixprop/list',
            timeout: 2000
          }
        });
      };
      _initResource(Settings.getAPI());

      var getConsMix = function (callback) {
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
          return getConsMix(function (response) {
            consmixs = response.data;
          });
        },
        resetData: function () {
          consmixs = [];
        },
        getConsmixs: function () {
          return consmixs;
        },
        getById: function (id) {
          if (!!consmixs) {
            for (var i = 0; i < consmixs.length; i++) {
              if (consmixs[i].id == id) {
                return consmixs[i];
              }
            }
          } else {
            return null;
          }
        }
      };

    });
})();
