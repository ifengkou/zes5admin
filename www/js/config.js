/**
 * Created by Sloong on 2015/12/16.
 */
(function () {
  "use strict";

  //setter gaia`s config
  angular.module("gaia.config", [])

    .constant("$ionicLoadingConfig", {
      "template": "请求中..."
    })

    .constant("ENV", {
      "version": "1.0.1",
      "name": "production",
      "debug": true,
      //"api": "http://218.75.145.253:8088/gaia/api",
      //"api1": "http://192.168.10.114:8080/api"
      //"api2": "http://192.168.0.107:8080/api"
    });


})();
