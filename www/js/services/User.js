angular.module('fcws.services')
    .factory('User', function ($q, $localstorage, $log, $rootScope) {
        var userKey = 'user';
        //var isAuthenticatedKey = 'isAuthenticated';
        var userDetailKey = 'userDetail';
        var user = $localstorage.get(userKey);
        var userdetail = $localstorage.get(userDetailKey);

        return {

            getUserDetail : function () {
                return $localstorage.get(userDetailKey);
            },
            storeUserDetail: function (data) {
                $localstorage.set(userDetailKey,data);
                userdetail =  $localstorage.get(userDetailKey);
            },

            //如果这里 data设为 user则会出现bug，因为这里已经有一个全局的user了。
            loginUser: function (data) {
                $log.log(data.id + " " + data.name + " " + data.description + " " + data.role + " " + data.accessToken +" " +data.district);
                $localstorage.set(userKey, {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    role: data.role,
                    district: data.district,
                    accessToken: data.accessToken
                });
                //$localstorage.set(isAuthenticatedKey, true);
                user = $localstorage.get(userKey);
                $rootScope.$broadcast('login');
            },
            logoutUser: function () {
                $localstorage.remove(userKey);
                //$localstorage.set(isAuthenticatedKey, false);
            },
            //isAuthenticated: function () {
            //    return $localstorage.get(isAuthenticatedKey);
            //},
            getUserId: function () {
                return user.id + "";
            },
            getUserDescription: function () {
                return user.description || "";
            },
            getRole: function () {
                return user.role || 6;
            },
            getUserName: function () {

                return user.name || "";
            },
            isLeader: function () {
                return user.isLeader || false;
            },
            getToken: function () {
                return user.accessToken;
            },
            getDistrict : function(){
                return user.district;
            }
        };
    });
