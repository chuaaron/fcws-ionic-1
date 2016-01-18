angular.module('fcws.services')
    .factory('Contact', function ($q, $localstorage, $log, $rootScope, SERVER, $http, User) {
        return {
            getDistricts: function () {
                return $http.get(SERVER.api_v1 + '/districts');
            },
            getTowns: function (district) {
                return $http.get(SERVER.api_v1 + '/districts/towns', {params: {district: district}});
            },
            getPeople: function (district, town) {
                return $http.get(SERVER.api_v1 + '/contacts/area', {params: {district: district, town: town}});
            },
            search : function(key){
                return $http.get(SERVER.api_v1 + '/contacts/search', {params: {key: key}});
            }
        };
    });
