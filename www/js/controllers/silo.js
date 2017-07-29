/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('SiloCtrl', function ($scope, $rootScope, $log,Silos) {
      $log.debug('SiloCtrl');
      $scope.titles =[];
      $scope.silos = Silos.getSilos();
      $scope.loadError = false;

      $scope.doRefresh = function () {
        $log.debug('do refresh');
        Silos.refresh().$promise.then(function (response) {
          $log.debug('do refresh complete');
          $scope.silos = response.data;
          for (var i = 0; i < $scope.silos.length; i++) {
            var node = $scope.silos[i];
            if($scope.titles.indexOf(node.ProductLineID)<0){
              $scope.titles.push(node.ProductLineID);
            }
          }
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

      /*$scope.article=[
        {"title":"文章1", "description":"文章 01 description","id":"0","group":"001"},
        {"title":"文章2", "description":"文章 02 description","id":"1","group":"002"},
        {"title":"文章3", "description":"文章 03 description","id":"2","group":"003"},
        {"title":"文章4", "description":"文章 04 description","id":"3","group":"003"}
      ];
      $scope.titles =[];
      for (var i = 0; i < $scope.article.length; i++) {
        var node = $scope.article[i];
        if($scope.titles.indexOf(node.group)<0){
          $scope.titles.push(node.group);
        }
      }
      $log.debug($scope.titles);*/
    });
})();
