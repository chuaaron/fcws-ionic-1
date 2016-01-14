angular.module('fcws.controllers')
    .controller('ControlCtrl', function ($scope, $rootScope, Orgnizations, User, $ionicModal, Message, $filter, API) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.noData = false;
            $scope.noNet = false;
            $scope.filter = {
                isAllSelect :  false
            }
            loadBelongs();
        });

        $scope.toggleAllSelection = function(){
            if(!$scope.filter.isAllSelect){
                $scope.newBroadcast.selection = [];
            }else{
                $scope.newBroadcast.selection = [];
                $scope.belongs.forEach(function(belong){
                    $scope.newBroadcast.selection.push(belong);
                });
            }
        }

        // toggle selection for a given fruit by name
        $scope.toggleSelection = function toggleSelection(belong) {
            var idx = $scope.newBroadcast.selection.indexOf(belong);
            if (idx > -1) {
                $scope.newBroadcast.selection.splice(idx, 1);
            }else {
                $scope.newBroadcast.selection.push(belong);
            }

            if($scope.newBroadcast.selection.length <  $scope.belongs.length){
                $scope.filter.isAllSelect = false;
            }else if($scope.newBroadcast.selection.length === $scope.belongs.length){
                $scope.filter.isAllSelect = true;
            }

            console.log(JSON.stringify($scope.newBroadcast.selection));
        };

        var loadBelongs = function () {
            console.log("loadBlongs");
            Orgnizations.getBelongs()
                .success(function (belongs) {
                    $scope.belongs = belongs;
                    $scope.selection = [];
                    $scope.noNet = false;
                    //console.log(JSON.stringify(belongs));
                    if (belongs.length === 0) {
                        $scope.noData = true;
                    }else{
                        $scope.noData = false;
                    }
                })
                .error(function (err, status) {
                    if (status === 0) {
                        //$rootScope.notify("出错了!! 请检查网络后重试");
                        $scope.noNet = true;
                    } else {
                        $rootScope.notify("未知错误");
                    }
                    $scope.belongs = [];
                }).finally(function () {

                $rootScope.$broadcast('scroll.refreshComplete');
            })
        };

        $scope.reloadBelongs = function () {
            loadBelongs();
        };


        $scope.newBroadcast = {
            content: '',
            selection: []
        };

        // Create the new  broadcast modal
        $ionicModal.fromTemplateUrl('templates/control/broadcastModal.html', {
            animation: 'slide-in-up',
            scope: $scope
        }).then(function (modal) {
            $scope.newBroadcastModal = modal;
        });

        $scope.showNewBroadcastModal = function () {
            if($scope.newBroadcast.selection.length === 0 ){
                $rootScope.notify("请至少选择一个联系人");
                return ;
            }
            //console.log(JSON.stringify( $scope.newBroadcast.selection));
            console.log($scope.newBroadcast.selection);
            $scope.newBroadcast.content = "";
            $scope.newBroadcastModal.show();
        };

        //close new mailbox modal
        $scope.closeNewBroadcastModal = function () {
            $scope.newBroadcastModal.hide();
        };

        $scope.broadcast = function (broadcast) {
           if(!broadcast.content){
               $rootScope.notify("不能发送空消息");
               return ;
           }
            Message.sendBroadcast(broadcast)
                .success(function () {
                    $rootScope.notify("消息发送成功!");
                    $scope.newBroadcastModal.hide();
                })
                .error(function () {
                    $rootScope.notify("消息发送失败!");
                });
        };

        //$scope.newMessage = {
        //    receiver_id: '',
        //    content: '',
        //};
        //
        //// Create the new  mailbox modal
        //$ionicModal.fromTemplateUrl('templates/control/messageModal.html', {
        //    animation: 'slide-in-up',
        //    scope: $scope
        //}).then(function (modal) {
        //    $scope.newMessageModal = modal;
        //});
        //
        //// show new mailbox modal
        //$scope.showNewMessageModal = function (belong) {
        //    $scope.sendTo = belong.description + belong.name;
        //    $scope.newMessage.content = "";
        //    $scope.newMessage.receiver_id = belong.id;
        //    $scope.newMessageModal.show();
        //};
        //
        ////close new mailbox modal
        //$scope.closeNewMessageModal = function () {
        //    $scope.newMessageModal.hide();
        //    $scope.newMessage.content = "";
        //};
        //
        //$scope.send = function (message) {
        //    var content = message.content;
        //    var receiver_id = message.receiver_id;
        //
        //    var form = {
        //        receiver_id: receiver_id,
        //        content: content,
        //    };
        //
        //    Message.sendAMessage(form)
        //        .success(function () {
        //            $rootScope.notify("消息发送成功!");
        //            $scope.newMessageModal.hide();
        //        })
        //        .error(function () {
        //            $rootScope.notify("消息发送失败!");
        //        });
        //};

    });
