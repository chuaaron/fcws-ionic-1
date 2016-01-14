angular.module('fcws.controllers')
    .controller('TrainCtrl', function ($scope) {

    })
    .controller('TrainExamCtrl', function ($scope, $state, User, Docs, $rootScope) {
        $scope.title = "训练考核";
        var category = "train";
        var sub_category = "exam";


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
    .controller('TrainPlanCtrl', function ($scope, $rootScope, Docs) {
        $scope.title = "通知计划";
        var category = "train";
        var sub_category = "plan";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category,sub_category);
            Docs.loadDocs($scope,category,sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope,category,sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    })
    .controller('TrainRuleCtrl', function($scope, $rootScope, Docs) {
        $scope.title = "训练法规";
        var category = "train";
        var sub_category = "rule";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category,sub_category);
            Docs.loadDocs($scope,category,sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope,category,sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    })
    .controller('TrainSearchCtrl', function($scope,$rootScope, Docs) {

        $scope.title = "资料查询";
        var category = "train";
        var sub_category = "search";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.docs = Docs.getLocalDocs(category,sub_category);
            Docs.loadDocs($scope,category,sub_category);
        });

        $scope.doRefresh = function () {
            Docs.loadDocs($scope,category,sub_category);
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $scope.showDoc = function (docid) {
            Docs.showDoc($scope, docid);
        };
    });
