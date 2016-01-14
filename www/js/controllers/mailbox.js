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
            $ionicPopup.alert({
                title: message.sender.description + message.sender.name,
                template: "<br>" + message.content + "<br>"
            });
        };
    });
