angular.module('fcws.controllers')
    .controller('SidemenuCtrl', function ($scope, User, $rootScope,Message,$log) {

        $scope.username = User.getUserName();
        $scope.description = User.getUserDescription();
        $scope.role = User.getRole();
        $scope.district = User.getDistrict();

        $rootScope.$on('login', function () {
            $scope.username = User.getUserName();
            $scope.description = User.getUserDescription();
            $scope.district = User.getDistrict();
            $scope.role = User.getRole();
        });


    });
