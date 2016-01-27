angular.module('fcws.services')
    .factory('User', function ($q, $localstorage){
        var userKey = 'user';
        //var mypostsKey = 'myposts';
        var user = $localstorage.get(userKey);
        return {



            getUser : function(){
                return $localstorage.get(userKey);
            },
            loginUser: function (data) {
                $localstorage.set(userKey, {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    role: data.role,
                    district: data.district,
                    accessToken: data.accessToken,
                    avatar : data.avatar
                });
                user = $localstorage.get(userKey);
            },
            logoutUser: function () {
                $localstorage.remove(userKey);
            },

            //getMyPosts : function(){
            //    return $localstorage.get(mypostsKey);
            //},
            //storeMyPosts : function(post){
            //    var myposts = $localstorage.get(mypostsKey);
            //    if(!posts){
            //
            //    }
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
            getToken: function () {
                return user.accessToken;
            },
            getDistrict : function(){
                return user.district;
            },
            getAvatar : function(){
                return user.avatar;
            },
            setAvatar : function(avatar){
                var user = $localstorage.get(userKey);
                user.avatar = avatar;
                $localstorage.set(userKey,user);
            },

        };
    });
