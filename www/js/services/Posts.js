angular.module('fcws.services')
  .factory('Posts', function($q,$http ,SERVER,$log,$localstorage) {
    var nextPage = 1;
    var hasNextPage = true;
    var limit = 10;
    var key = "posts_";
    var posts =$localstorage.get(key) || [];

    return {

      getRecent: function() {
        return $http.get(SERVER.api_v1 + '/posts', {
          params: {
              page : 1,
              limit : 5
          }
        });
      },
      //get local posts
      getPosts: function() {
        posts =$localstorage.get(key) || [];
        return posts;
      },

      hasNextPage: function(has) {
        if (typeof has !== 'undefined') {
          hasNextPage = has;
        }
        return hasNextPage;
      },

      refresh: function() {
        console.log("refresh");
        var promise = $http.get(SERVER.api_v1 + '/posts',{params:{page: 1, limit : limit}});

        promise.success(function(response){
          if(response.length < limit){
            hasNextPage = false;
          }else{
            hasNextPage = true;
            nextPage = 2;
          }
          posts = response;
          $localstorage.set(key,posts);
        });
        return promise;
      },

      pagination: function() {
        var promise = $http.get(SERVER.api_v1 + '/posts',{params:{page: nextPage, limit : limit}});

        promise.success(function(response){
          if(response.length < limit){
            hasNextPage = false;
          }else{
              hasNextPage = true;
              nextPage ++;
          }
          posts = posts.concat(response);
          $localstorage.set(key,posts);
        });
        return promise;
      },

      saveItem: function(form) {
        return $http.post(SERVER.api_v1 + '/posts', form);
      },
    };
  });
