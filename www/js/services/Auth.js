angular.module('fcws.services')
    .factory('Auth', function (SERVER, $http) {
        return {
            authentication: function (id, password) {
                return $http.get(SERVER.api_v1 + '/auth/local', {
                    params: {
                        'id': id,
                        'password': password
                    }
                });
            },
            changePassword: function (form) {
                return $http.post(SERVER.api_v1 + '/users/changePassword', form);
            },
            getDetail: function () {
                return $http.get(SERVER.api_v1 + '/users/details');
            },



            //test the accesstoken valiable
            //accesstoken: function () {
            //    var token = this.getToken();
            //    return $http.get(SERVER.api_v1 + '/accesstoken', {
            //        params: {
            //            access_token: token
            //        },
            //        timeout:CONFIG.TIME_OUT
            //    });
            //},

            //checkLogin: function(){
            //    if (this.isAuthenticated() && this.getToken() !== '') {
            //        console.log(User.isAuthenticated() + "    " + User.getToken());
            //        this.accesstoken()
            //            .success(function () {
            //                $window.location.href = ('#/sidemenu/posts');
            //            })
            //            .error(function () {
            //                $window.location.href = ('#/signin');
            //            });
            //    }
            //},
        }
    });