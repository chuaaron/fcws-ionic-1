angular.module('fcws.controllers')
    .controller('UserCtrl', function ($scope, $rootScope, $state, User, API, $log,Auth) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.user = User.getUserDetail();
            $scope.loadUser();
        });

        $scope.loadUser = function () {
            Auth.getDetail().success(function (data) {
                User.storeUserDetail(data);
            }).error(function () {
                $log.error("error loadUser");
            }).finally(function(){
                $scope.user = User.getUserDetail();
                $rootScope.$broadcast('scroll.refreshComplete');
            })
        };

        $scope.reloadUser = function () {
            $scope.loadUser();

        };

    });
