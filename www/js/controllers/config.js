angular.module('fcws.controllers')
    .controller('ConfigCtrl', function ($scope, $rootScope, $state, User, $ionicPopup, API, $window, $cordovaFileTransfer, $cordovaFileOpener2, $ionicLoading, SERVER,Update) {
        $scope.logout = function () {
            User.logoutUser();
            $state.go('signin');
        };

        $scope.changePassword = function () {
            $window.location.href = ('#/sidemenu/changepw');
        }

        $scope.shutdown = function () {
            ionic.Platform.exitApp();
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.currentVersion = "0.0.0";
            cordova.getAppVersion().then(function (version) {
                $scope.currentVersion = version;
            });
        });

        $scope.checkUpdate = function () {

            //alert("功能在开发中,敬请期待");
            //alert($scope.currentVersion);
            Update.getUpdateInfo()
                .success(function(data){
                    var serverAppVersion = data.versionCode;
                    if ($scope.currentVersion  !== serverAppVersion) {
                        showUpdateConfirm(data);
                    }else{
                        $rootScope.notify("已是最新版本");
                    }
                })
                .error(function (data) {
                    //alert("error" + JSON.stringify(data));
                })
        }


        // 显示是否更新对话框
        var showUpdateConfirm = function (apk) {
            var confirmPopup = $ionicPopup.confirm({
                title: '版本升级',
                template: apk.updateMessage, //从服务端获取更新的内容
                cancelText: '取消',
                okText: '升级'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $ionicLoading.show({
                        template: "已经下载：0%"
                    });
                    var url = apk.url ;//可以从服务端获取更新APP的路径
                    //alert(url);
                    var targetPath = cordova.file.externalApplicationStorageDirectory+"fcws.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                    //alert(targetPath);

                    var trustHosts = true
                    var options = {};
                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                        // 打开下载下来的APP
                        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
                        ).then(function () {
                            // 成功
                        }, function (err) {
                            // 错误
                        });
                        $ionicLoading.hide();
                    }, function (err) {
                        alert('下载失败');
                        $ionicLoading.hide();
                    }, function (progress) {
                        //进度，这里使用文字显示下载百分比
                        $timeout(function () {
                            var downloadProgress = (progress.loaded / progress.total) * 100;
                            $ionicLoading.show({
                                template: "已经下载：" + Math.floor(downloadProgress) + "%"
                            });
                            if (downloadProgress > 99) {
                                $ionicLoading.hide();
                            }
                        })
                    });
                } else {
                    // 取消更新
                }
            });
        }
    });
