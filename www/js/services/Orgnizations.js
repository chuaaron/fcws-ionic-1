angular.module('fcws.services')
  .factory('Orgnizations', function($http, SERVER) {
    return {
      getBelongs: function() {
        return $http.get(SERVER.api_v1 + "/users/belongs");
      }
    };
  });
