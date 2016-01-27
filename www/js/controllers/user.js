angular.module('fcws.controllers')
    .controller('UserPostsCtrl', function ($scope, $rootScope, $state, Auth) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.posts = Auth.getLocalPosts();
            Auth.getRecentPosts()
                .success(function (data) {
                    Auth.storeLocalPosts(data);
                    $scope.posts = Auth.getLocalPosts();
                }).error(function () {
                });
        });
    });

angular.module('fcws.controllers')
    .controller('UserRepliesCtrl', function ($scope, $rootScope, $state, Auth) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.replies= Auth.getLocalReplies();
            Auth.getRecentReplies()
                .success(function (data) {
                    Auth.storeLocalReplies(data);
                    $scope.replies = Auth.getLocalReplies();
                }).error(function () {
            });
        });
    });


angular.module('fcws.controllers')
    .controller('UserCtrl', function ($scope, $rootScope, $state, User, API, $log, Auth, $ionicActionSheet, Photo, $cordovaImagePicker, Uploader, $ionicLoading, $timeout) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.user = User.getUser();
            //$scope.loadUser();
        });

        //$scope.loadUser = function () {
        //    Auth.getDetail().success(function (data) {
        //        User.storeUserDetail(data);
        //    }).error(function () {
        //        $log.error("error loadUser");
        //    }).finally(function () {
        //        $scope.user = User.getUserDetail();
        //        //console.log(JSON.stringify($scope.user.avatar));
        //        $rootScope.$broadcast('scroll.refreshComplete');
        //    })
        //};

        //$scope.reloadUser = function () {
        //    $scope.loadUser();
        //
        //};

        $scope.showActions = function () {
            // Show the action sheet
            $ionicActionSheet.show({
                buttons: [{
                    text: "拍照"
                }, {
                    text: "从图片库选择"
                }],
                //titleText: "添加图片",
                cancelText: '取消',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $scope.takePhoto();
                    } else {
                        $scope.pickImage();
                    }
                    return true;
                }
            });
        };

        //take photo with camera
        $scope.takePhoto = function () {
            var options = {
                quality: 80,
                targetWidth: 200,
                targetHeight: 200,
                saveToPhotoAlbum: false,
                allowEdit: false,
                destinationType: Camera.DestinationType.DATA_URL
            }

            Photo.getPicture(options).then(function (imageData) {
                $scope.uploadAvatar(imageData);
            }, function (err) {
                //
            });
        };

        //image picker
        $scope.pickImage = function () {
            var options = {
                quality: 80,
                targetWidth: 200,
                targetHeight: 200,
                saveToPhotoAlbum: false,
                allowEdit: false,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
            }

            Photo.getPicture(options).then(function (imageURI) {
                $scope.uploadAvatar(imageURI);
            }, function (err) {
                //
            });
        };

        $scope.uploadAvatar = function (imageData) {
            var image = "data:image/jpg;base64," + imageData;
            var toastUpload = '<ion-spinner icon="ios"></ion-spinner>';
            $ionicLoading.show({template: toastUpload});

            Auth.uploadAvatar({image: image})
                .success(function (data) {
                    User.setAvatar(data);
                    $scope.user = User.getUser();
                }).error(function () {

            }).finally(function () {
                $ionicLoading.hide();
            })


            //Uploader.upload(imageURL).then(function (res) {
            //    $ionicLoading.hide();
            //    //refresh user avatar
            //
            //}, function (err) {
            //    $ionicLoading.hide();
            //}, function (progress) {
            //    $timeout(function () {
            //        var percentage = Math.floor(progress.loaded / progress.total * 100);
            //        $ionicLoading.show({template: '上传中... : ' + percentage + '%'});
            //    });
            //});
        }

    });
