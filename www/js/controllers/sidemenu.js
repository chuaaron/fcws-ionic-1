angular.module('fcws.controllers')
    .controller('SidemenuCtrl', function ($scope, User, $rootScope,Message,$log) {

        $scope.username = User.getUserName();
        $scope.description = User.getUserDescription();
        $scope.role = User.getRole();

        $rootScope.$on('login', function () {
            $scope.username = User.getUserName();
            $scope.description = User.getUserDescription();
            $scope.role = User.getRole();
        });


    });
