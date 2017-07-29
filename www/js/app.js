// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

(function () {
  "use strict";
  angular.module('gaia', ['ionic', 'angularMoment', 'ngCordova', 'gaia.controllers', 'gaia.config', 'gaia.services'])

    .run(function ($ionicPlatform, $log, $timeout, $state, $rootScope, $cordovaDialogs, $cordovaToast, $ionicHistory, $ionicLoading) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }

        if (navigator.splashscreen) {
          $timeout(function () {
            navigator.splashscreen.hide();
          }, 100);
        } else {
          $log.debug('no splash screen plugin');
        }

        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        //双击退出
        $ionicPlatform.registerBackButtonAction(function (e) {
          if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
          } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortTop('再按一次退出系统');
            $timeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }
          e.preventDefault();
          return false;
        }, 101);//end 双击退出

      });//end ready

      var errorMsg = {
        0: '网络出错了，请再试一下',
        1: '登录授权已过期，需要重新登陆',
        'wrong accessToken': '授权失败'
      };
      $rootScope.requestErrorHandler = function (options, callback) {
        return function (response) {
          $log.error("error: "+response);
          $ionicLoading.hide();
          var error = "请求出错了！";
          if (response.message) {
            error = response.message;
          } else if (response.data && response.data.error_msg) {
            error = errorMsg[response.data.error_msg];
          } else if (response.status) {
            error = errorMsg[response.status] || 'Error' + response.status + ' ' + response.statusText;
          }
          var o = options || {};
          angular.extend(o, {
            template: error,
            duration: 1000
          });
          $ionicLoading.show(o);
          return callback && callback();
        };
      };//end requestErrorHandler

    })

    .config(function (ENV, $stateProvider, $urlRouterProvider, $logProvider, $ionicConfigProvider) {

      $logProvider.debugEnabled(ENV.debug);

      $stateProvider

        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })
        .state('app.user', {
          url: '/user/:username',
          views: {
            'menuContent': {
              templateUrl: 'templates/user.html',
              controller: 'UserCtrl'
            }
          }
        })
        .state('signin', {
          url: '/sign-in',
          templateUrl: 'templates/sign-in.html',
          controller: 'SignInCtrl'
        })
        .state('app.consmixs', {
          url: '/consmixs',
          cache:false,
          views: {
            'menuContent': {
              templateUrl: 'templates/consmixs.html',
              controller: 'ConsMixsCtrl'
            }
          }
        })
        .state('app.consmix', {
          url: '/consmix/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/consmix.html',
              controller: 'ConsMixCtrl'
            }
          }
        })
        .state('app.plans', {
          url: '/plans',
          views: {
            'menuContent': {
              templateUrl: 'templates/plans.html',
              controller: 'PlansCtrl'
            }
          }
        })
        .state('app.dispatch', {
          url: '/dispatch',
          views: {
            'menuContent': {
              templateUrl: 'templates/dispatch.html',
              controller: 'DispatchCtrl'
            }
          }
        })
        .state('app.shipping', {
          url: '/shipping',
          views: {
            'menuContent': {
              templateUrl: 'templates/shipping.html',
              controller: 'ShippingCtrl'
            }
          }
        })
        .state('app.silo', {
          url: '/silo',
          views: {
            'menuContent': {
              templateUrl: 'templates/silo.html',
              controller: 'SiloCtrl'
            }
          }
        })
        .state('app.tasks', {
          url: '/tasks',
          views: {
            'menuContent': {
              templateUrl: 'templates/tasks.html',
              controller: 'TasksCtrl'
            }
          }
        })
        .state('app.settings', {
          url: '/settings',
          views: {
            'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'SettingsCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/sign-in');

      //Animation style when transitioning between views. Default platform.
      $ionicConfigProvider.views.transition("ios");
      // Which side of the navBar to align the title. Default center.
      $ionicConfigProvider.navBar.alignTitle('center');
      //Tab style. Android defaults to striped and iOS defaults to standard.
      $ionicConfigProvider.tabs.style("standard");

      //Toggle item style. Android defaults to small and iOS defaults to large.
      $ionicConfigProvider.form.toggle("large");
      //Checkbox style. Android defaults to square and iOS defaults to circle.
      $ionicConfigProvider.form.checkbox("circle");
    });//end config

  //setter custom's module
  angular.module('gaia.controllers', ['gaia.services', 'ionic-timepicker']);

  angular.module('gaia.services', ['ngResource', 'gaia.config']);

  //angular.module('gaia.directives', ['ionic']);
})();
