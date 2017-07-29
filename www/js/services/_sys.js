/**
 * Created by Sloong on 2015/10/20.
 */
(function () {
  'use strict';
  angular.module('gaia.services')
    .factory('_Sys', function (ConsMix,ConsMixs,Plans,User) {
      return {
        changeResource: function (url) {
          ConsMix.initResource(url);
          ConsMixs.initResource(url);
          Plans.initResource(url);
          User.initResource(url);
        }
      };
    });
})();