angular.module('fcws.controllers')
    .controller('ContactDistrictCtrl', function ($scope, $rootScope, Contact, $ionicModal,API,$ionicScrollDelegate) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.searchResults = [];
            $scope.search = {
                key: ""
            };
            $scope.doRefresh();
        });



        $scope.doRefresh = function () {
            Contact.getDistricts()
                .success(function (data) {
                    $scope.districts = data;
                })
                .error(function (data, status) {
                    console.log("getDistricts error");
                }).finally(function () {
                $rootScope.$broadcast('scroll.refreshComplete');
            });
        }

        // Create the new  broadcast modal
        $ionicModal.fromTemplateUrl('templates/contact/searchModal.html', {
            animation: 'slide-in-up',
            scope: $scope
        }).then(function (modal) {
            $scope.newSearchModal = modal;
        });

        $scope.clearSearch = function(){
            console.log("clearSearch");
            $scope.searchResults = [];
            $scope.search.key = "";
        }

        $scope.showSearchModal = function () {
            $scope.searchResults = [];
            $scope.search.key = "";
            $scope.newSearchModal.show();
        };

        //close new mailbox modal
        $scope.closeSearchModal = function () {
            $scope.newSearchModal.hide();
        };

        $scope.Search = function (key) {
            if (!key || key.trim() === "") {
                $rootScope.notify("搜索内容不能为空");
                return;
            }

            Contact.search(key)
                .success(function (data) {
                    $scope.searchResults = data;
                    $ionicScrollDelegate.resize();
                    $ionicScrollDelegate.scrollTop();
                    //console.log(JSON.stringify(data));
                })
                .error(function (data, status) {
                    console.log("search error");
                });
        }

    })

    .controller('ContactTownCtrl', function ($scope, $rootScope, Contact, $stateParams) {
        $scope.district = $stateParams.district;

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.doRefresh();

        });

        $scope.doRefresh = function () {
            Contact.getTowns($scope.district)
                .success(function (data) {
                    $scope.towns = data;
                })
                .error(function (data, status) {
                    console.log("getTowns error");
                })
                .finally(function () {
                    $rootScope.$broadcast('scroll.refreshComplete');
                });
        }


    })
    .controller('ContactPeopleCtrl', function ($scope, $rootScope, Contact, $stateParams) {
        $scope.district = $stateParams.district;
        $scope.town = $stateParams.town;

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.doRefresh();

        });

        $scope.doRefresh = function () {

            Contact.getPeople($scope.district, $scope.town)
                .success(function (data) {
                    $scope.users = data;
                })
                .error(function (data, status) {
                    console.log("getPeople error");
                })
                .finally(function () {
                    $rootScope.$broadcast('scroll.refreshComplete');
                });
        }
    });
