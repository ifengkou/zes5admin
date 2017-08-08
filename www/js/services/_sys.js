/**
 * Created by Sloong on 2015/10/20.
 */
(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('_Sys', function (ConsMix,ConsMixs,Plans,User,Dispatch,Shipping,Silos, $log) {
      return {
        changeResource: function (url) {
          $log.debug("_Sys.changeResource");
          ConsMix.initResource(url);
          ConsMixs.initResource(url);
          Plans.initResource(url);
          User.initResource(url);
          Dispatch.initResource(url);
          Shipping.initResource(url);
          Silos.initResource(url);
        }
      };
    });
})();
