angular.module('fcws.controllers')
    .controller('SidemenuCtrl', function ($scope, User, $rootScope) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.user = User.getUser();
        });

        //$scope.username = User.getUserName();
        //$scope.description = User.getUserDescription();
        //$scope.role = User.getRole();
        //$scope.district = User.getDistrict();
        //
        //$rootScope.$on('login', function () {
        //    $scope.username = User.getUserName();
        //    $scope.description = User.getUserDescription();
        //    $scope.district = User.getDistrict();
        //    $scope.role = User.getRole();
        //});


    });
