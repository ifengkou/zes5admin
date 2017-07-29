(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('Shipping', function (Settings, $resource, $log, User) {
      $log.debug("ShippingService");

      var statData = {};
      var shipping = [];
      var resource = null;
      var _initResource = function (apiUrl) {
        resource = $resource(apiUrl + '/shipping/:id', {id: '@id'}, {
          query: {
            method: 'get',
            url: apiUrl + '/shipping/list',
            timeout: 2000
          },
          stat:{
            method:'get',
            url: apiUrl + "/shipping/stat"
          }
        });
      };
      _initResource(Settings.getAPI());

      var getStat = function (btime,etime,callback) {
        return resource.stat({
          accesstoken: User.getCurrentUser().token,
          beginTime: btime,
          endTime:etime
        }, function (r) {
          return callback && callback(r);
        }, function (e) {
          $log.debug(e);
        });
      };
      var getShipping = function (btime,etime,callback) {
        return resource.query({
          accesstoken: User.getCurrentUser().token,
          beginTime: btime,
          endTime:etime
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
        refreshStat: function (btime,etime) {
          return getStat(btime,etime,function(response){
            statData = response.data;
          });
        },
        refreshShipping: function (btime,etime) {
          return getShipping(btime,etime,function (response) {
            shipping = response.data;
          });
        },
        resetData: function () {
          statData = {};
          shipping = [];
        },
        getShipping: function () {
          return shipping;
        },
        getStat: function () {
          return statData;
        }
      };
    });
})();
