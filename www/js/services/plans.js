(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Plans', function (Settings, $resource, $log, User) {
      $log.debug("PlansService");
      var statData = {};
      var plans = [];
      var tstatDate ={};
      var tplans = [];
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
          },
          tlist:{
            method: 'get',
            url: apiUrl + '/plans/tomorrow'
          },
          tstat:{
            method:'get',
            url: apiUrl + "/plans/tomorrow/total"
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

      var getTStat = function (callback) {
        return resource.tstat({
          accesstoken: User.getCurrentUser().token,
        }, function (r) {
          return callback && callback(r);
        }, function (e) {
          $log.debug(e);
        });
      };
      var getTPlans = function (callback) {
        return resource.tlist({
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
        },
        refreshTStat: function () {
          return getTStat(function(response){
            tstatData = response.data;
          });
        },
        refreshTPlans: function () {
          return getTPlans(function (response) {
            tplans = response.data;
          });
        },
        resetTData: function () {
          tstatData = {};
          tplans = [];
        },
        getTPlans: function () {
          return tplans;
        },
        getTStat: function () {
          return tstatData;
        }
      };
    });
})();
