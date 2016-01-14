angular.module('fcws.services')
    .factory('Post', function ($q, $localstorage, $log, $rootScope, User, $http, SERVER) {
        var postKey = 'post_';
        return {
            storePost: function (post_id,data) {
                $localstorage.set(postKey+post_id,data);
            },
            getLocalPost: function (post_id) {
                return  $localstorage.get(postKey+post_id);
            },
            delLocalPost: function (post_id) {
                $localstorage.remove(postKey+post_id);
            },
            getPost: function (id) {
                return $http.get(SERVER.api_v1 + '/posts/' + id);
            },
            deletePost: function (id) {
                return $http.delete(SERVER.api_v1 + '/posts/' + id);
            },
            saveReply: function (reply) {
                return $http.post(SERVER.api_v1 + '/replys', reply);
            },
            deleteReply: function (replyId) {
                return $http.delete(SERVER.api_v1 + '/replys/' + replyId);
            }
        };
    });
