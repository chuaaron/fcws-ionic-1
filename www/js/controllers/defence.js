/*
 Controller for our 国防动员
 */
angular.module('fcws.controllers')
    .controller('DefenceCtrl', function ($scope) {

    })
    .controller('DefenceCallCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "兵员征集";
        var category = "defence";
        var sub_category = "call";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category, sub_category);
            Docs.loadDocs($scope, category, sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope, category, sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    })
    .controller('DefenceOrganizationCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "组织机构";
        var category = "defence";
        var sub_category = "organization";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category, sub_category);
            Docs.loadDocs($scope, category, sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope, category, sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    })
    .controller('DefencePotentialCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "基本潜力";
        var category = "defence";
        var sub_category = "potential";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category, sub_category);
            Docs.loadDocs($scope, category, sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope, category, sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };

    })
    .controller('DefenceRuleCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "法规政策";
        var category = "defence";
        var sub_category = "rule";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category, sub_category);
            Docs.loadDocs($scope, category, sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope, category, sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    });
