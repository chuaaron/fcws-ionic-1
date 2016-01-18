angular.module('fcws.services')
    .factory('Camera', ['$q', function ($q) {
        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        };
    }]);
//
//angular.module('fcws.services').config(function ($compileProvider) {
//    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//});
