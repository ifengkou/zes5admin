(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Plans', function (Settings, $resource, $log, User) {
      $log.debug("PlansService");
      var statData = {};
      var plans = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/plans/:id', {id: '@id'}, {
          query: {
            method: 'get',
            url: apiUrl + '/plans/today',
            timeout: 2000
          },
          stat:{
            method:'get',
            url: apiUrl + "/plans/total"
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
      var getPlans = function (callback) {
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
        refreshPlans: function () {
          return getPlans(function (response) {
            plans = response.data;
          });
        },
        resetData: function () {
          statData = {};
          plans = [];
        },
        getPlans: function () {
          return plans;
        },
        getStat: function () {
          return statData;
        }
      };
    });
})();
