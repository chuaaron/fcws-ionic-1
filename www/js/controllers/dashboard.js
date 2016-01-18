angular.module('fcws.controllers')
    .controller('DashboardCtrl', function ($scope, $rootScope, $state, User, $ionicPopup, API, $window, Message, $log, Posts,Docs) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if (!User.getToken()) {
                $window.location.href = ('#/signin');
                return;
            }
            $scope.unRead = 0;
            $scope.lengthLimit = 12;
            $scope.loadAll();
        });

        $scope.loadAll = function(){
            Message.getMessageCount()
                .success(function (data) {
                    $scope.unRead = data.count;
                    $log.info("Unread Message Count: " + $scope.unRead);

                    Posts.getRecent()
                        .success(function (data) {
                            $scope.recent_posts = data;
                            if ($scope.recent_posts.length === 0) {
                                $scope.read_recent_posts_error = true;
                            } else {
                                $scope.read_recent_posts_error = false;
                            }

                            Docs.getRecent()
                                .success(function (data) {
                                    $scope.recent_docs= data;
                                    if ($scope.recent_docs.length === 0) {
                                        $scope.read_recent_docs_error = true;
                                    } else {
                                        $scope.read_recent_docs_error = false;
                                    }
                                    $rootScope.$broadcast('scroll.refreshComplete');
                                }).error(function (data, status, headers, config) {
                                $scope.recent_docs = [];
                                $scope.read_recent_docs_error = true;
                                $rootScope.$broadcast('scroll.refreshComplete');
                            });

                        }).error(function (data, status, headers, config) {
                        $scope.recent_posts = [];
                        $scope.read_recent_posts_error = true;
                        $rootScope.$broadcast('scroll.refreshComplete');
                    });

                }).error(function () {
                $rootScope.$broadcast('scroll.refreshComplete');
                //
            });
        }

        $rootScope.$on('entermailbox', function () {
            $scope.unRead = 0;
            //$scope.getUnReadMessagesCount();
        });

        $scope.reloadRecent = function() {
            $scope.loadAll();
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };



        //$scope.getUnReadMessagesCount = function () {
        //    Message.getMessageCount()
        //        .success(function (data) {
        //            $scope.unRead = data.count;
        //            $log.info("Unread Message Count: " + $scope.unRead);
        //        }).error(function () {
        //            //
        //    });
        //};



        //$scope.loadRecentPosts = function () {
        //    Posts.getRecent()
        //        .success(function (data) {
        //            $scope.recent_posts = data;
        //            if ($scope.recent_posts.length === 0) {
        //                $scope.read_recent_posts_error = true;
        //            } else {
        //                $scope.read_recent_posts_error = false;
        //            }
        //        }).error(function (data, status, headers, config) {
        //        $scope.recent_posts = [];
        //        $scope.read_recent_posts_error = true;
        //            //$rootScope.hide();
        //        //$rootScope.notify("出错了!!请检查网络后重试");
        //    });
        //};



        //$scope.loadRecentDocs = function () {
        //    Docs.getRecent()
        //        .success(function (data) {
        //            $scope.recent_docs= data;
        //            if ($scope.recent_docs.length === 0) {
        //                $scope.read_recent_docs_error = true;
        //            } else {
        //                $scope.read_recent_docs_error = false;
        //            }
        //        }).error(function (data, status, headers, config) {
        //        $scope.recent_docs = [];
        //        $scope.read_recent_docs_error = true;
        //        //$rootScope.hide();
        //        //$rootScope.notify("出错了!!请检查网络后重试");
        //    });
        //};
    });