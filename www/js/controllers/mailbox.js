angular.module('fcws.controllers')
    .controller('MailboxCtrl', function ($scope, User, $ionicPopover, $ionicPopup, Message, $rootScope, API, $log) {

        $scope.$on('$ionicView.beforeEnter', function () {
            loadMessages();
        });

        var loadMessages = function () {
            Message.getMessages()
                .success(function (data) {
                    if (data.hasnot_read_messages.length !== 0) {
                        Message.markAllMessages().success(function () {
                            $log.log("mark all messages success!");
                        });
                    }
                    Message.storeLocalMessages(data);
                })
                .error(function () {
                })
                .finally(function () {
                    $scope.messages = Message.getLocalMessages();
                    $rootScope.$broadcast('entermailbox');
                })
        }

        $scope.reloadMessages = function () {
            loadMessages();
            $rootScope.$broadcast('scroll.refreshComplete');
        }

        $scope.showContent = function (message) {
            console.log(JSON.stringify(message));
            //$ionicPopup.alert({
            //    title: message.sender.description + message.sender.name,
            //    template: "<br>" + message.content + "<br>"
            //});
            $scope.reply = {};

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="reply.content" placeholder="回复">',
                title: "<br>" + message.content + "<br>",
                scope: $scope,
                buttons: [
                    {text: '取消'},
                    {
                        text: '<b>回复</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.reply.content) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.reply.content;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                if (res) {
                    console.log('Tapped!', res);
                    var form= {
                        receiver_id: message.sender.id,
                        content : res
                    };
                    Message.sendReply(form)
                        .success(function () {
                            $rootScope.notify("回复发送成功!");
                        })
                        .error(function () {
                            $rootScope.notify("回复发送失败!");
                        });
                }
            });

        };
    });
