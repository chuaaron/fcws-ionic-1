angular.module('fcws.controllers')
    .controller('PostCtrl', function ($scope, Posts, $ionicPopup, User, $filter, $stateParams,
                                      $rootScope, API, Post, $state, $ionicActionSheet, $timeout, $log, SERVER, $ionicModal, $ionicScrollDelegate) {
        //force angular to create post object
        $scope.post = {
            id: "",
            user: "",
            title: "",
            content: "",
            important: false,
            date: "",
            // likes: [],
            replies: []
        };
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.post = Post.getLocalPost(post_id);
            $scope.loadPost();
        });

        $scope.userId = User.getUserId();
        var post_id = $stateParams.post_id;
        // $scope.isLike = false;

        // var checkisLike = function () {
        //   var indexUser = $scope.post.likes.indexOf(user_id);
        //   if (indexUser !== -1) {
        //     $scope.isLike = true;
        //   } else {
        //     $scope.isLike = false;
        //   }
        // }

        // Create the image Modal for show
        $ionicModal.fromTemplateUrl('templates/imageModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.imageModel = modal;
        });

        $scope.showImageModal = function (url) {
            //alert("gethere");
            $scope.imageSrc = url;
            $scope.imageModel.show();
        };

        $scope.closeImageModal = function () {
            $scope.imageModel.hide();
        };

        $scope.loadPost = function () {
            Post.getPost(post_id)
                .success(function (data) {
                    Post.storePost(post_id, data);

                    // //设置isLike的值
                    // checkisLike();
                })
                .error(function () {
                    $log.error("error loadPost");
                }).finally(function () {
                $rootScope.$broadcast('scroll.refreshComplete');
                $scope.post = Post.getLocalPost(post_id);
                if ($scope.post.photos !== undefined) {
                    for (var i = 0; i < $scope.post.photos.length; i++) {
                        $scope.post.photos[i] = SERVER.ip+ "/uploads/" + $scope.post.photos[i];
                        console.log($scope.post.photos[i]);
                    }
                }
                $ionicScrollDelegate.resize();
            })
        };


        $scope.reloadPost = function () {
            $scope.loadPost();
        };

        // $scope.Like = function() {
        //   checkisLike();
        //   if($scope.isLike){
        //     Post.unlikePost(post_id)
        //       .success(function(data) {
        //           $scope.isLike = false;
        //         })
        //       .error(function() {
        //         $log.error("error unlike");
        //       });
        //   }else{
        //     Post.likePost(post_id)
        //       .success(function(data) {
        //           $scope.isLike = true;
        //         })
        //       .error(function() {
        //         $log.error("error like");
        //       });
        //   }
        // };


        // $scope.isCreater = function() {
        //   var userToken = User.getToken();
        //   var postToken = $scope.post.token;
        //   return (userToken == postToken);
        // };

        $scope.replyData = {
            content: ""
        };
        //  modify
        $scope.addReply = function () {
            if ($scope.replyData.content === "") {
                $rootScope.notify("回复内容不能为空");
                return;
            }

            var reply = {
                post_id: post_id,
                content: $scope.replyData.content,
            };

            Post.saveReply(reply)
                .success(function (data) {
                    $scope.replyData.content = "";
                    $scope.loadPost();
                }).error(function (data, status) {
                if (status === 0) {
                    $rootScope.notify('没有网络连接,请检查网络')
                } else if (status === 422) {
                    $rootScope.notify("回复内容不能为空");
                } else if (status === 404) {
                    $rootScope.notify("该情报不存在或已被删除");
                } else {
                    $rootScope.notify("未知错误");
                }
                $log.error('error add reply');
            });
        };


        //delete post
        $scope.deletePost = function () {
            Post.deletePost(post_id)
                .success(function () {
                    Post.delLocalPost(post_id);
                    $rootScope.notify('情报删除成功');
                    $state.go('sidemenu.posts');
                }).error(function (data, status) {
                if (status === 0) {
                    $rootScope.notify('没有网络连接,请检查网络')
                } else if (status === 403) {
                    $rootScope.notify("你没有权限");
                } else if (status === 404) {
                    $rootScope.notify("该情报不存在或已被删除");
                } else {
                    $rootScope.notify("未知错误");
                }
                $log.error('delete post error');
            });
        };

        //delete reply
        $scope.deleteReply = function (reply) {
            var reply_id = reply._id;
            Post.deleteReply(reply_id)
                .success(function () {
                    $scope.loadPost();
                }).error(function (data, status) {
                if (status === 0) {
                    $rootScope.notify('没有网络连接,请检查网络')
                } else if (status === 403) {
                    $rootScope.notify("你没有权限");
                } else if (status === 404) {
                    $rootScope.notify("该评论不存在或已被删除");
                } else {
                    $rootScope.notify("未知错误");
                }
                $log.error("delete reply error")
            });
        };


        // delete post confirm dialog
        $scope.showDeletePostConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: '确认删除？',
                template: '您确定要删除这个情报吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $scope.deletePost();
                }
            });
        };

        // delete reply confirm dialog
        $scope.showDeleteReplyConfirm = function (reply) {
            var confirmPopup = $ionicPopup.confirm({
                title: '确认删除？',
                template: '您确定要删除这条回复吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $scope.deleteReply(reply);
                }
            });
        };

        $scope.showActions = function (reply) {
            var at = reply.author.name || reply.author.description || "";
            var title ="@" + at;
            var DeleteButton = (User.getUserId() === reply.author_id ? "删除" : "");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: "回复"
                },],
                destructiveText: DeleteButton,
                titleText: title,
                cancelText: '取消',
                cancel: function () {
                },
                destructiveButtonClicked: function () {
                    $scope.showDeleteReplyConfirm(reply);
                    return true;
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $scope.replyData.content = title + " ";
                        $timeout(function () {
                            document.querySelector('.reply-new input').focus();
                        }, 1);
                    }
                    return true;
                }
            });
        };
    });
