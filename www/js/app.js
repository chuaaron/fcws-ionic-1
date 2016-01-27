// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('fcws', [
        'ionic',
        'fcws.controllers',
        'fcws.services',
        'fcws.utils',
        'angularMoment',
        'ngCordova'
    ])

    .run(function ($ionicPlatform, amMoment, $log, $window, $rootScope, User, $cordovaDialogs, $ionicPopup, $state, $location) {
        amMoment.changeLocale('zh-cn');

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(false);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });


        //// 监听 $rootScope 的 $routeChangeStart 事件
        //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        //    // 如果下一个路由不允许匿名， 并且没有认证， 则重定向到 login 页面
        //    if (! toState.data.allowAnonymous && !User.getToken()) {
        //        console.log(JSON.stringify(toState) + " " + User.getToken());
        //        $log.log('Authentication required, redirect to login.');
        //        var returnUrl = $location.url();
        //        $log.log('return url is ' + returnUrl);
        //
        //        event.preventDefault();
        //        $location.path('/signin').search({ returnUrl: returnUrl });
        //    }
        //});

        $ionicPlatform.registerBackButtonAction(function (e) {
            var current_state_name = $state.current.name;
            if (current_state_name !== 'sidemenu.post'
                && current_state_name !== 'sidemenu.contact_town' &&
                current_state_name !== 'sidemenu.contact_people' &&
                current_state_name !== 'sidemenu.profile' &&
                current_state_name !== 'sidemenu.recentposts') {
                $ionicPopup.confirm({
                    title: '退出应用',
                    template: '您确定要退出凤城卫士吗?',
                    cancelText: '取消',
                    okText: '确定'
                }).then(function (res) {
                    if (res) {
                        //ionic.Platform.exitApp();
                        navigator.app.exitApp();
                    } else {
                        console.log('You are not sure');
                    }
                });
                e.preventDefault();
                return false;
            } else {
                navigator.app.backHistory();
            }
        }, 100);


        $rootScope.$on('unAuthenticed', function () {
            var alertPopup = $ionicPopup.alert({
                title: '重新登录',
                template: '您的账号信息已过期,请重新登录'
            });

            alertPopup.then(function (res) {
                User.logoutUser();
                $location.path('/signin');
            });
            console.log("未授权");
        });


    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, $httpProvider) {

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file|assets-library):|data:image\//);
        $ionicConfigProvider.navBar.alignTitle('center');


        $httpProvider.interceptors.push(function ($q, $location, User, $rootScope) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (User.getToken()) {
                        config.headers.Authorization = 'Bearer ' + User.getToken();
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        //如果之前登陆过
                        if (User.getToken()) {
                            //alert(User.getToken());
                            //console.log(User.getToken());
                            $rootScope.$broadcast('unAuthenticed');
                        }
                    }
                    return $q.reject(response);
                }
            };
        });

        //$httpProvider.interceptors.push(function($rootScope) {
        //    return {
        //        request: function(config) {
        //            $rootScope.$broadcast('loading:show')
        //            return config
        //        },
        //        response: function(response) {
        //            $rootScope.$broadcast('loading:hide')
        //            return response
        //        }
        //    }
        //});


        $stateProvider
        // login page
            .state('signin', {
                url: "/signin",
                templateUrl: 'templates/auth/signin.html',
                controller: 'LogInCtrl',
                //data : {
                //    allowAnonymous: true
                //}
            })

            .state('sidemenu.changepw', {
                url: "/changepw",
                views: {
                    'menuContent': {
                        templateUrl: 'templates/auth/changepw.html',
                        controller: 'ChangepwCtrl'
                    }
                },
            })

            .state('sidemenu', {
                url: '/sidemenu',
                abstract: true,
                templateUrl: 'templates/sidemenu.html',
                controller: 'SidemenuCtrl',
                //data : {
                //    allowAnonymous: false
                //}

            })

            .state('sidemenu.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })


            .state('sidemenu.user', {
                url: '/user',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/index.html',
                        controller: 'UserCtrl'
                    }
                }
            })
            .state('sidemenu.profile', {
                url: '/user/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/profile.html',
                        controller: 'UserCtrl'
                    }
                }
            })

            .state('sidemenu.recentposts', {
                url: '/user/recentposts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/recent_posts.html',
                        controller: 'UserPostsCtrl'
                    }
                }
            })
            .state('sidemenu.recentreplies', {
                url: '/user/recentreplies',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/recent_replies.html',
                        controller: 'UserRepliesCtrl'
                    }
                }
            })

            .state('sidemenu.mailbox', {
                url: '/mailbox',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/mailbox.html',
                        controller: 'MailboxCtrl'
                    }
                }
            })

            .state('sidemenu.posts', {
                url: '/posts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/post/list.html',
                        controller: 'PostsCtrl'
                    }
                }
            })

            .state('sidemenu.post', {
                url: '/posts/:post_id',
                views: {
                    'menuContent': {
                        templateUrl: "templates/post/detail.html",
                        controller: 'PostCtrl'
                    }
                }
            })


            .state('sidemenu.control', {
                url: '/control',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/control/tab.html',
                        controller: 'ControlCtrl'
                    }
                }
            })

            .state('sidemenu.control.direct', {
                url: '/direct',
                views: {
                    'direct': {
                        templateUrl: 'templates/control/direct.html',
                        controller: 'ControlDirectCtrl'
                    }
                }
            })

            .state('sidemenu.control.broadcast', {
                url: '/broadcast',
                views: {
                    'broadcast': {
                        templateUrl: 'templates/control/broadcast.html',
                        controller: 'ControlBroadcastCtrl'
                    }
                }
            })


            .state('sidemenu.train', {
                url: '/train',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/train.html',
                        controller: 'TrainCtrl'
                    }
                }
            })

            .state('sidemenu.train.plan', {
                url: '/plan',
                views: {
                    'plan': {
                        templateUrl: 'templates/docs.html',
                        controller: 'TrainPlanCtrl'
                    }
                }
            })

            .state('sidemenu.train.rule', {
                url: '/rule',
                views: {
                    'rule': {
                        templateUrl: 'templates/docs.html',
                        controller: 'TrainRuleCtrl'
                    }
                }
            })

            .state('sidemenu.train.search', {
                url: '/search',
                views: {
                    'search': {
                        templateUrl: 'templates/docs.html',
                        controller: 'TrainSearchCtrl'
                    }
                }
            })

            .state('sidemenu.train.exam', {
                url: '/exam',
                views: {
                    'exam': {
                        templateUrl: 'templates/docs.html',
                        controller: 'TrainExamCtrl'
                    }
                }
            })

            .state('sidemenu.education', {
                url: '/education',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/education.html',
                        controller: 'EducationCtrl'
                    }
                }
            })

            .state('sidemenu.education.plan', {
                url: '/plan',
                views: {
                    'plan': {
                        templateUrl: 'templates/docs.html',
                        controller: 'EducationPlanCtrl'
                    }
                }
            })

            .state('sidemenu.education.achieve', {
                url: '/achieve',
                views: {
                    'achieve': {
                        templateUrl: 'templates/docs.html',
                        controller: 'EducationAchieveCtrl'
                    }
                }
            })

            .state('sidemenu.education.rule', {
                url: '/rule',
                views: {
                    'rule': {
                        templateUrl: 'templates/docs.html',
                        controller: 'EducationRuleCtrl'
                    }
                }
            })

            .state('sidemenu.education.edu', {
                url: '/edu',
                views: {
                    'edu': {
                        templateUrl: 'templates/docs.html',
                        controller: 'EducationEduCtrl'
                    }
                }
            })

            .state('sidemenu.defence', {
                url: '/defence',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/defence.html',
                        controller: 'DefenceCtrl'
                    }
                }
            })

            .state('sidemenu.defence.organization', {
                url: '/organization',
                views: {
                    'organization': {
                        templateUrl: 'templates/docs.html',
                        controller: 'DefenceOrganizationCtrl'
                    }
                }
            })

            .state('sidemenu.defence.rule', {
                url: '/rule',
                views: {
                    'rule': {
                        templateUrl: 'templates/docs.html',
                        controller: 'DefenceRuleCtrl'
                    }
                }
            })

            .state('sidemenu.defence.call', {
                url: '/call',
                views: {
                    'call': {
                        templateUrl: 'templates/docs.html',
                        controller: 'DefenceCallCtrl'
                    }
                }
            })

            .state('sidemenu.defence.potential', {
                url: '/potential',
                views: {
                    'potential': {
                        templateUrl: 'templates/docs.html',
                        controller: 'DefencePotentialCtrl'
                    }
                }
            })

            .state('sidemenu.contact_district', {
                url: '/contact',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact/contact_district.html',
                        controller: 'ContactDistrictCtrl'
                    }
                }
            })

            .state('sidemenu.contact_town', {
                url: '/contact/:district',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact/contact_town.html',
                        controller: 'ContactTownCtrl'
                    }
                }
            })

            .state('sidemenu.contact_people', {
                url: '/contact/:district/:town',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact/contact_people.html',
                        controller: 'ContactPeopleCtrl'
                    }
                }
            })

            .state('sidemenu.config', {
                url: '/config',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/config.html',
                        controller: 'ConfigCtrl'
                    }
                }
            })

            .state('sidemenu.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about.html',
                        controller: 'ConfigCtrl'
                    }
                }
            })

        //$urlRouterProvider.otherwise('signin');
        $urlRouterProvider.otherwise('sidemenu/dashboard');

    })
    .constant('SERVER', {
        //api_v1: 'http://fcws.nemoworks.info/api/v1',
        //uploads: 'http://fcws.nemoworks.info/uploads'

        api_v1: 'http://localhost:3000/api/v1',
        ip: 'http://localhost:3000'


        //api_v1: 'http://121.42.175.137:3000/api/v1',
        //ip: 'http://121.42.175.137:3000'

        //api_v1: 'http://114.212.83.123:3000/api/v1',
        //ip: 'http://114.212.83.123:3000'

    });

angular.module('fcws.services', ['fcws.utils']);

angular.module('fcws.controllers', ['ionic', 'fcws.services', 'fcws.utils']);

angular.module('fcws.utils', []);
