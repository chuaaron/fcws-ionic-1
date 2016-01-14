angular.module('fcws.controllers')
    /*
     Controller for our 教育管理
     */
    .controller('EducationCtrl', function ($scope) {

    })
    .controller('EducationAchieveCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "成果交流";
        var category = "education";
        var sub_category = "achieve";

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
    .controller('EducationEduCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "教育资料";
        var category = "education";
        var sub_category = "edu";

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
    .controller('EducationPlanCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "通知计划";
        var category = "education";
        var sub_category = "plan";

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
    .controller('EducationRuleCtrl', function ($scope, Docs, $rootScope) {
        $scope.title = "法规命令";
        var category = "education";
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
