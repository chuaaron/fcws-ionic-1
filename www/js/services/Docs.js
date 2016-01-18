angular.module('fcws.services')
    .factory('Docs', function ($http, SERVER, $rootScope, API, PreviewService, $sce, User, $localstorage) {
        var docKey = 'doc_';
        var docsKey = 'docs_';
        return {
            storeDocs: function (category, sub_category, data) {
                $localstorage.set(docsKey + "_" + category + "_" + sub_category, data);
            },
            getLocalDocs: function (category, sub_category) {
                return $localstorage.get(docsKey + "_" + category + "_" + sub_category);
            },

            storeDoc: function (doc_id, data) {
                $localstorage.set(docKey + doc_id, data);
            },
            getLocalDoc: function (doc_id) {
                return $localstorage.get(docKey + doc_id);
            },

            getDocs: function (category, sub_category) {
                return $http.get(SERVER.api_v1 + '/contents/subcategory', {
                    params: {
                        category: category,
                        sub_category: sub_category
                    },
                });
            },
            getRecent: function(){
                return $http.get(SERVER.api_v1 + '/contents', {
                    params: {
                        limit : 5
                    },
                });
            },

            getDocData: function (docid) {
                return $http.get(SERVER.api_v1 + '/contents/' + docid);
            },

            loadDocs: function ($scope, category, sub_category) {
                var that = this;
                this.getDocs(category, sub_category)
                    .success(function (data) {
                        that.storeDocs(category, sub_category, data);
                    })
                    .error(function () {

                    }).finally(function () {
                    $scope.docs = that.getLocalDocs(category, sub_category);
                });
            },
            showDoc: function ($scope, docid) {
                var that = this;
                this.getDocData(docid)
                    .success(function (data, status, headers, config) {
                        that.storeDoc(docid, data);
                    })
                    .error(function (data, status, headers, config) {

                    }).finally(function () {
                    var markdownData = that.getLocalDoc(docid);
                    $scope.docHtml = $sce.trustAsHtml(markdownData);
                    PreviewService
                        .init('templates/docModal.html', $scope)
                        .then(function (modal) {
                            modal.show();
                        });
                })
            },
        };
    });
