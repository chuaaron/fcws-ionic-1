angular.module('fcws.services')
    .factory('Uploader', function ($q, $cordovaFileTransfer, SERVER, $window,User) {
        return {
            //upload : function(images){
            //    var token = User.getToken();
            //    var url = SERVER.api_v1 + "/upload?"+"access_token="+token;
            //    var promises = [];
            //
            //    console.info(url + " " + images);
            //    for(var i = 0 ; i < images.length; i++){
            //        var targetpath = images[i];
            //        var filename = targetpath.split("/").pop();
            //        console.info("filename:" + filename);
            //        var options = {
            //            fileKey: "photo",
            //            fileName: filename,
            //            chunkedMode: false,
            //            mimeType: "image/jpg"
            //        };
            //        promises.push($cordovaFileTransfer.upload(url, targetpath, options));
            //    }
            //   return  $q.all(promises);
            //}

            cancelUpload : function(){
                $cordovaFileTransfer.abort();
            },

            upload: function (imageURL) {
                var token = User.getToken();
                var url = SERVER.api_v1 + "/upload?"+"access_token="+token;
                var targetpath = imageURL;
                var filename = targetpath.split("/").pop();
                console.info("filename:" + filename);
                var options = {
                    fileKey: "photo",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };
                return $cordovaFileTransfer.upload(url, targetpath, options);
            }
        }

    });