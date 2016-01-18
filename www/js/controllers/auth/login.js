angular.module('fcws.controllers')
    .controller('LogInCtrl', function ($rootScope, $scope, $window, User, API,Auth) {
        $scope.user = {
            id: "",
            password: ""
        };

        $scope.validateUser = function () {
            var id = $scope.user.id;
            var password = $scope.user.password;
            if (!id || !password) {
                $rootScope.notify("请输入完整信息");
                return false;
            }

            $rootScope.show('登录中...请稍候');
            Auth.authentication(id, password)
                .success(function (user) {
                    User.loginUser(user);
                    $rootScope.hide();
                    $window.location.href = ('#/sidemenu/dashboard');
                }).error(function (error, status) {
                $rootScope.hide();
                if (status === 0) {
                    $rootScope.notify("没有网络连接,请检查网络");
                } else if (status === 401) {
                    $rootScope.notify("无效的用户名或密码");
                } else
                {
                    $rootScope.notify("未知错误");
                }
                console.log(status);
            });
        };
    });
