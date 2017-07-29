/**
 * Created by Sloong on 2015/12/20.
 */
(function () {
  'use strict';
  angular.module('gaia.controllers')
    .controller('ConsMixCtrl', function ($scope,$state,$stateParams, $rootScope, $log, $ionicPopup,$ionicLoading, $timeout,$location,ConsMix) {
      $log.debug('ConsMixCtrl');

      var id = $stateParams.id;

      $scope.id = id;
      $scope.stuffs = [];//ConsMix.getStuffs();
      $scope.doRefresh = function(){
        ConsMix.refresh(id).$promise.then(function (response) {
          $log.debug('do refresh stuffs complete'+id);
          /*$timeout(function () {

          }, 4000);*/
          $scope.stuffs = response.data;
          $scope.loadError = false;
        }, $rootScope.requestErrorHandler({
          noBackdrop: true
        }, function () {
          $scope.loadError = true;
        })).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      //$scope.doRefresh();
      $timeout(function(){
        $scope.doRefresh();
      },300);


      $scope.auditConsMix = function(){
        var confirmPopup = $ionicPopup.confirm({
          title: '确认提交审核',
          template: '是否确认无误，提交该配比审核？',
          cancelText:"取消",
          okText: '确认',
          okType:"button-positive"
        });
        confirmPopup.then(function (res) {
          if (res) {
            ConsMix.audit(id).$promise.then(function (response) {
              if (response.success) {
                $state.go("app.consmixs");
                /*ConsMixs.refresh().$promise.then(function (response) {
                  $state.go("app.consmixs");
                }, $rootScope.requestErrorHandler({
                  noBackdrop: true
                }, function (e) {
                }));*/
               /* $timeout(function () {
                  //$state.go("app.consmixs");
                  $location.path("/app/consmixs");
                }, 400);*/
              } else {
                $ionicLoading.show({
                  noBackdrop: true,
                  template: response.message,
                  duration: 1000
                });
              }
            }, $rootScope.requestErrorHandler({}, null));
          } else {
            $log.debug('You are not sure');
          }
        });
      };

    });
})();
