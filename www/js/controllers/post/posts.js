angular.module('fcws.controllers')
    .controller('PostsCtrl', function ($scope, Posts, $rootScope, $ionicLoading,
                                       User, API, $log, $ionicModal, $filter, Camera, $cordovaImagePicker, $ionicActionSheet, $timeout, Uploader, $ionicScrollDelegate, $window) {

        // pagination
        $scope.hasNextPage = false;
        $scope.loadError = false;
        $scope.lengthLimit = 12;
        $scope.doingRefresh = false;


        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.posts = Posts.getPosts();


            $scope.doRefresh();
        });

        $scope.doRefresh = function () {

            if ($scope.doingRefresh) {
                return;
            }
            $scope.doingRefresh = true;
            Posts.refresh()
                .success(function (data) {
                    $scope.posts = data;

                    if ($scope.posts.length === 0) {
                        $scope.noData = true;
                    } else {
                        $scope.noData = false;
                    }

                    $scope.loadError = false;
                    //$scope.hasNextPage = true;
                    $scope.hasNextPage = Posts.hasNextPage();
                })
                .error(function (data, status, headers, config) {
                    $scope.loadError = true;
                    //$log.error(data);
                }).finally(function () {
                $rootScope.$broadcast('scroll.refreshComplete');
                $scope.posts = Posts.getPosts();
                $ionicScrollDelegate.resize();
                $scope.doingRefresh = false;
            })
        };

        $scope.loadMore = function () {
            Posts.pagination()
                .success(function (data) {
                    $scope.loadError = false;
                    $scope.hasNextPage = false;
                    //avoid fresh too quickly
                    $timeout(function () {
                        $scope.hasNextPage = Posts.hasNextPage();
                    }, 100);
                })
                .error(function () {
                    $scope.loadError = true;
                }).finally(function () {
                $scope.posts = Posts.getPosts();
                $ionicScrollDelegate.resize();
                $rootScope.$broadcast('scroll.refreshComplete');
            })
        };

        //  new post
        $scope.newPost = {
            content: '',
            photos: [],
            important: false
        };

        // Create the new  post modal
        $ionicModal.fromTemplateUrl('templates/post/newModal.html', {
            animation: 'slide-in-up',
            scope: $scope
        }).then(function (modal) {
            $scope.newPostModal = modal;
        });

        // show new topic modal
        $scope.showNewPostModal = function () {
            $scope.newPost.content = "";
            $scope.newPost.important = false;
            $scope.newPost.photos = [];
            $scope.newPostModal.show();
            $scope.imageToUpload = null;
        };

        $scope.closeNewPostModal = function () {
            $scope.newPostModal.hide();
            //$scope.newPost.content = "";
            //$scope.newPost.important = false;
            //$scope.newPost.photos = [];
        };

        $scope.showActions = function () {
            // Show the action sheet
            $ionicActionSheet.show({
                buttons: [{
                    text: "拍照"
                }, {
                    text: "从图片库选择"
                }],
                titleText: "添加图片",
                cancelText: '取消',
                cancel: function () {
                },
                buttonClicked: function (index) {
                    if ($scope.imageToUpload !== null) {
                        $rootScope.notify("最多添加一张照片");
                        return false;
                    }

                    if (index === 0) {
                        $scope.takePhoto();
                    } else {
                        $scope.pickImage();
                    }
                    return true;
                }
            });
        };

        //fake takephoto
        //$scope.takePhoto = function () {
        //    if ($scope.imageToUpload !== null) {
        //        $rootScope.notify("最多添加一张照片");
        //        return;
        //    }
        //
        //    var imageURI = "./img/logo.png";
        //    $scope.imageToUpload = imageURI;
        //};

        $scope.imageToUpload = null;

        //take photo with camera
        $scope.takePhoto = function () {
            var options = {
                quality: 20
            }

            Camera.getPicture(options).then(function (imageURI) {
                $scope.imageToUpload = imageURI;
            }, function (err) {

            });
        };

        //image picker
        $scope.pickImage = function () {
            //if ($scope.imageToUpload !== null) {
            //    $rootScope.notify("最多添加一张照片");
            //    return;
            //}
            var options = {
                maximumImagesCount: 1,
                quality: 20
            };
            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    if(results[0].trim() !== "" && results[0] !== null){
                        $scope.imageToUpload = results[0];
                    }
                }, function (error) {
                    // error getting photos
                });
        };

        $scope.removePhoto = function () {
            $scope.imageToUpload = null;
        };

        // Create the image Modal for show
        $ionicModal.fromTemplateUrl('templates/imageModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.imageModel = modal;
        });

        $scope.showImageModal = function (url) {
            $scope.imageSrc = url;
            $scope.imageModel.show();
        };

        $scope.closeImageModal = function () {
            $scope.imageModel.hide();
        };


        var clearPost = function () {
            $scope.newPost.content = '';
            $scope.newPost.photos = [];
            $scope.newPost.important = false;
            $scope.imageToUpload = null;
        }

        $scope.cancelUpload = function () {
            Uploader.cancelUpload();
            $ionicLoading.hide();
        }

        $scope.createNewPost = function () {
            if ($scope.imageToUpload !== null) {
                var percentage;
                var toastUpload = '上传图片 : ' + 0 + '%';
                $ionicLoading.show({
                    scope: $scope,
                    template: '<button class="button button-clear"  ng-click="cancelUpload()" style="color: #FFFFFF;"><i class="icon ion-close-circled" style="vertical-align: middle;"></i><span style="vertical-align: middle;">&nbsp;&nbsp;' + toastUpload + '</span></button>'
                });
                var imageURL = $scope.imageToUpload;
                //$ionicLoading.show({template: toastUpload});
                $scope.newPost.photos = [];

                Uploader.upload(imageURL).then(function (res) {
                    //alert("成功");
                    //$ionicLoading.show({template: '图片上传成功', duration: 1000});
                    $ionicLoading.hide();
                    var data = JSON.parse(res.response);
                    $scope.newPost.photos.push(data.filename);
                    Posts.saveItem($scope.newPost)
                        .success(function (data) {
                            clearPost();
                            $scope.newPostModal.hide();
                            $scope.doRefresh();
                        })
                        .error(function (data) {
                            $log.error("create post failure");
                            $rootScope.notify("情报发布失败");
                        });
                }, function (err) {
                    //alert("失败");
                    $ionicLoading.show({template: '图片上传失败', duration: 1000});
                }, function (progress) {
                    //alert("called progress ");
                    $timeout(function () {
                        percentage = Math.floor(progress.loaded / progress.total * 100);
                        $ionicLoading.show({
                            scope: $scope,
                            template: '<button class="button button-clear"  ng-click="cancelUpload()" style="color: #FFFFFF;"><i class="icon ion-close-circled" style="vertical-align: middle;"></i><span style="vertical-align: middle;">&nbsp;&nbsp;' + '上传图片 : ' + percentage + '%' + '</span></button>'
                        });
                        //$ionicLoading.show({template: '上传图片 : ' + percentage + '%'});
                    });
                });

            } else {
                Posts.saveItem($scope.newPost)
                    .success(function (data) {
                        $rootScope.notify("情报发布成功");
                        clearPost();
                        $scope.newPostModal.hide();
                        $scope.doRefresh();
                    })
                    .error(function (data) {
                        $log.error("create post failure");
                        $rootScope.notify("情报发布失败");
                    });
            }


        }

//
////fake pick image
//$scope.pickImage = function () {
//    if ($scope.images.length >= 3) {
//        $rootScope.notify("最多上传3张图片");
//        return;
//    }
//    var imageURI = "./img/avatar.jpg";
//    if($scope.images.indexOf(imageURI) <= -1)
//        $scope.images.push(imageURI);
//    else
//        $rootScope.notify("该照片已经添加过了");
//};


    })
;
