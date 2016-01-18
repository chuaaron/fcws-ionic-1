angular.module('fcws.services')
    .factory('Update', function ($q, $cordovaFileTransfer, SERVER,$http ) {
        return {
            getUpdateInfo: function () {
                //return $http.get(SERVER.api_v1 + '/update');
                return $http.get("http://lab.artemisprojects.org/distrib/fcws/raw/master/apk.json");
                //http://lab.artemisprojects.org/distrib/fcws/raw/master/apk.json
            },

        }
    });