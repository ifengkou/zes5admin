/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('PlansCtrl', function ($scope, $rootScope, $log,Plans) {
      $log.debug('PlansCtrl');
      $scope.plans = Plans.getPlans();
      $scope.statData = Plans.getStat();
      $scope.loadError = false;

      $scope.doRefresh = function () {
        $log.debug('do refresh');
        Plans.refreshStat().$promise.then(function (response) {
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
        Plans.refreshPlans().$promise.then(function (response) {
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
