angular.module('fcws.utils')
    .factory('$notification', function ($window, $ionicLoading) {
        return {
            show: function (text) {
                $ionicLoading.show({
                    template: text|| '加载中...'
                });
            },
            hide: function () {
                $ionicLoading.hide();
            },
            notify: function (text) {
                $ionicLoading.show({
                            template: text || '加载中...'
                        });
                $window.setTimeout(function () {
                    $ionicLoading.hide();
                }, 999);
            }
        }
    });