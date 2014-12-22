var calApp = angular.module('cal', ['ui.router', 'snap', 'ngSanitize', 'pascalprecht.translate','angularFileUpload'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/calendar');
                $stateProvider.state('reload', {
                    url: '/reload',
                    controller: 'ReloadCtrl',
                    templateUrl: '/fragments/reload.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('global', {
                    url: '/global',
                    controller: 'GlobalCtrl',
                    templateUrl: 'templates/global.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('calendar', {
                    url: '/calendar',
                    controller: 'CalendarCtrl',
                    templateUrl: 'templates/calendar.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });

                $stateProvider.state('apply', {
                    url: "/apply",
                    controller: 'ApplyLocationCtrl',
                    templateUrl: 'templates/locations/apply.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });

                $stateProvider.state('reservation_edit', {
                    url: '/reservation/edit/:id',
                    controller: 'EditReservationCtrl',
                    templateUrl: 'templates/reservations/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });

                $stateProvider.state('reservation_new', {
                    url: '/reservation/new/:date/:start/:end',
                    controller: 'NewReservationCtrl',
                    templateUrl: 'templates/reservations/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });

                $stateProvider.state('location_list', {
                    url: '/location/list',
                    controller: 'ListLocationCtrl',
                    templateUrl: 'templates/locations/list.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('location_edit', {
                    url: '/location/edit/:id',
                    controller: 'EditLocationCtrl',
                    templateUrl: 'templates/locations/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('location_new', {
                    url: '/location/new',
                    controller: 'NewLocationCtrl',
                    templateUrl: 'templates/locations/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('location_history', {
                    url: '/location/history/:id',
                    controller: 'LocationHistoryCtrl',
                    templateUrl: 'templates/locations/history.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('location_currentStatusReservation', {
                    url: '/location/currentStatusReservation/:id',
                    controller: 'LocationCurrentStatusReservationCtrl',
                    templateUrl: 'templates/locations/currentStatusReservation.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('asset_list', {
                    url: '/asset/list',
                    controller: 'ListAssetCtrl',
                    templateUrl: 'templates/assets/list.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('asset_edit', {
                    url: '/asset/edit/:id',
                    controller: 'EditAssetCtrl',
                    templateUrl: 'templates/assets/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('asset_new', {
                    url: '/asset/new',
                    controller: 'NewAssetCtrl',
                    templateUrl: 'templates/assets/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('unauthorized', {
                    url: '/unauthorized',
                    templateUrl: 'templates/unauthorized.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('news_list', {
                    url: '/news',
                    controller: 'ListNewsCtrl',
                    templateUrl: 'templates/news/list.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('news_edit', {
                    url: '/news/edit/:id',
                    controller: 'EditNewsCtrl',
                    templateUrl: 'templates/news/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('news_new', {
                    url: '/news/new',
                    controller: 'NewNewsCtrl',
                    templateUrl: 'templates/news/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                
                $stateProvider.state('stats_devices', {
                    url: '/stats',
                    controller: 'DevicesStatsCtrl',
                    templateUrl: 'templates/stats/devices.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('stats_device', {
                    url: '/stats/device/:id',
                    controller: 'DeviceStatsCtrl',
                    templateUrl: 'templates/stats/device.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('stats_person', {
                    url: '/stats/person/:id',
                    controller: 'PersonStatsCtrl',
                    templateUrl: 'templates/stats/person.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                $stateProvider.state('stats_me', {
                    url: '/stats/me',
                    controller: 'MyStatsCtrl',
                    templateUrl: 'templates/stats/me.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                
                 $stateProvider.state('report_global', {
                    url: '/report/glob',
                    controller: 'ReportGlobalCtrl',
                    templateUrl: 'templates/report/report.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });
                
                $stateProvider.state('profile_edit', {
                    url: '/profile/edit/:id/:location',
                    controller: 'ProfileCtrl',
                    templateUrl: 'templates/profile/edit.html',
                    resolve: {
                        endpoint: "endpoint"
                    }
                });

            }]);

        