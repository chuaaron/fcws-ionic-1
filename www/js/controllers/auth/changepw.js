angular.module('fcws.controllers')
  /*
  Controller for the Splash page
  */
  .controller('ChangepwCtrl', function($rootScope, $scope, User, API, $ionicHistory,Auth) {
    $scope.user = {
      password: "",
      repeat_password: ""
    };


    $scope.changePassword = function() {
      var id = User.getUserId();
      var password = $scope.user.password.trim();
      var new_password = $scope.user.new_password.trim();
      var repeat_password = $scope.user.repeat_password.trim();
      if (new_password !== repeat_password) {
        $rootScope.notify("两次填写的密码不一致");
        return false;
      }

      Auth.changePassword({
        'id': id,
        'password': password,
        'new_password': new_password,
      }).success(function() {
        $rootScope.notify("密码修改成功");
        $ionicHistory.goBack();
      }).error(function(error) {
        $rootScope.notify("密码输入错误");
      });
    };
  });
