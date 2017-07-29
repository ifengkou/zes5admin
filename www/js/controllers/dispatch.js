/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('DispatchCtrl', function ($scope, $rootScope, $log,Dispatch) {
      $log.debug('DispatchCtrl');
      $scope.dispatchs = Dispatch.getDispatch();
      $scope.statData = Dispatch.getStat();
      $scope.loadError = false;

      $scope.doRefresh = function () {
        $log.debug('do refresh');
        Dispatch.refreshStat().$promise.then(function (response) {
          $log.debug('do refresh complete');
          $scope.statData = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function () {
          $scope.loadError = true;
        })).finally(function () {
          //$scope.$broadcast('scroll.refreshComplete');
        });
        Dispatch.refreshDispatch().$promise.then(function (response) {
          $log.debug('do refresh complete');
          $scope.dispatchs = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function () {
          $scope.loadError = true;
        })).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      //first execute
      $scope.doRefresh();
    });
})();
