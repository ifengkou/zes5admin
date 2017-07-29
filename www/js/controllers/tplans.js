/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('TPlansCtrl', function ($scope, $rootScope, $log,Plans) {
      $log.debug('TPlansCtrl');
      $scope.plans = Plans.getTPlans();
      $scope.statData = Plans.getTStat();
      $scope.loadError = false;

      $scope.doRefresh = function () {
        $log.debug('do refresh');
        Plans.refreshTStat().$promise.then(function (response) {
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
        Plans.refreshTPlans().$promise.then(function (response) {
          $log.debug('do refresh complete');
          $scope.plans = response.data;
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
