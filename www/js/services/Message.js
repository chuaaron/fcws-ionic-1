angular.module('fcws.services')
    .factory('Message', function ($q, $http, $log, SERVER, User, $localstorage) {
        var messagekey = 'Messages';
        return {
            getMessageCount: function () {
                return $http.get(SERVER.api_v1 + '/messages/unreadCount');
            },
            markAllMessages: function () {
                return $http.post(SERVER.api_v1 + '/messages/markAllRead', null);
            },
            storeLocalMessages: function (data) {
                $localstorage.set(messagekey, data);
            },
            getLocalMessages: function () {
                return $localstorage.get(messagekey);
            },
            getMessages: function () {
                return $http.get(SERVER.api_v1 + '/messages');
            },
            //sendAMessage: function (form) {
            //    return $http.post(SERVER.api_v1 + '/messages', form);
            //},
            sendBroadcast: function (form) {
                return $http.post(SERVER.api_v1 + '/messages/broadcast', form);
            },
            sendLevels: function (form) {
                return $http.post(SERVER.api_v1 + '/messages/levels', form);
            },
            sendReply: function (form) {
                return $http.post(SERVER.api_v1 + '/messages/reply', form);
            },

        };
    });
