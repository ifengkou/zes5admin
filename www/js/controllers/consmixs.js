/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('ConsMixsCtrl', function ($scope, $rootScope, $log, $timeout,ConsMixs) {
      $log.debug('ConsMixsCtrl');
      $scope.consmixs = ConsMixs.getConsmixs();
      $scope.loadError = false;

      $scope.doRefresh = function () {
        $log.debug('do refresh');
        ConsMixs.refresh().$promise.then(function (response) {
          $log.debug('do refresh complete');
          $scope.consmixs = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function (e) {
          $scope.loadError = true;
        })).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      //first execute
      $scope.doRefresh();
    });
})();
