(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Dispatch', function (Settings, $resource, $log, User) {
      $log.debug("DispatchService");
      var statData = {};
      var dispatch = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/dispatch/:id', {id: '@id'}, {
          query: {
            method: 'get',
            url: apiUrl + '/dispatch/list',
            timeout: 2000
          },
          stat:{
            method:'get',
            url: apiUrl + "/dispatch/stat"
          }
        });
      };
      _initResource(Settings.getAPI());

      var getStat = function (callback) {
        return resource.stat({
          accesstoken: User.getCurrentUser().token,
        }, function (r) {
          return callback && callback(r);
        }, function (e) {
          $log.debug(e);
        });
      };
      var getDispatch = function (callback) {
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
        refreshStat: function () {
          return getStat(function(response){
            statData = response.data;
          });
        },
        refreshDispatch: function () {
          return getDispatch(function (response) {
            dispatch = response.data;
          });
        },
        resetData: function () {
          statData = {};
          dispatch = [];
        },
        getDispatch: function () {
          return dispatch;
        },
        getStat: function () {
          return statData;
        }
      };
    });
})();
