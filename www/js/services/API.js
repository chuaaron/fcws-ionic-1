angular.module('fcws.services')
  .factory('API', function($rootScope,$ionicLoading, $window) {
    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : '读取中...',
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 999);
    };

    return {

    };
  });
