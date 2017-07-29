/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('SettingsCtrl', function ($scope, $log, $ionicLoading,$ionicPopup) {
      $log.debug('Settings ctrl');
      $scope.now = new Date();
      $scope.exitApp = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: '确认退出',
          template: '确认退出应用？',
          cancelText:"取消",
          okText: '确认',
          okType:"button-energized"
        });
        confirmPopup.then(function (res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        });
      };
    });
})();
