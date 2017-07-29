/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('ShippingCtrl', function ($scope, $rootScope, $log,Shipping) {
      $log.debug('ShippingCtrl');
      $scope.isSearching = false;
      $scope.shipping = Shipping.getShipping();
      $scope.statData = Shipping.getStat();
      $scope.loadError = false;
      var nowDate = new Date();
      $scope.dateBean = {
        beginTime:new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate()),
        endTime:new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()+1)
      };
      $scope.doSearch = function () {
        $log.debug('shipping doSearch');
        $scope.isSearching = true;
        Shipping.refreshStat($scope.dateBean.beginTime.getTime(),$scope.dateBean.endTime.getTime()).$promise.then(function (response) {
          $log.debug('do refreshStat complete');
          $scope.statData = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function () {
          $scope.loadError = true;
        })).finally(function () {
          //$scope.$broadcast('scroll.refreshComplete');
        });
        Shipping.refreshShipping($scope.dateBean.beginTime.getTime(),$scope.dateBean.endTime.getTime()).$promise.then(function (response) {
          $log.debug('do refreshShipping complete');
          $scope.shipping = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function () {
          $scope.loadError = true;
        })).finally(function () {
          $scope.isSearching = false;
          //取消下拉刷新
          //$scope.$broadcast('scroll.refreshComplete');
        });
      };


      //点击查询再加载
      //$scope.doRefresh();
    });
})();
