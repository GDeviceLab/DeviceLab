calApp.controller("ReloadCtrl", function($window) {
    $window.location.hash = "#/calendar";
});

calApp.controller("CalendarCtrl", function($scope, $rootScope, endpoint, $window, $timeout) {
    var heightDeviceMax = 250;
    var heightDeviceMin = 60;
    $scope.search = {};
    $scope.isCalendarVisible = false;
    $scope.wellDeviceHeight = heightDeviceMax;
    
    $scope.search.person = '';
    if(!$rootScope.appState){
        $rootScope.appState = {};
    }
    var d = new Date();
    if(!$rootScope.appState.date){
        $rootScope.appState.date = d;
    } else {
        d = $rootScope.appState.date;
    }
    
    $scope.$watch(function(){
        return $scope.date.toDateString();
    }, function(){
        $rootScope.appState.date = $scope.date;
    });
    
    $scope.date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    
    $scope.datePlus = function(offset){
        return new Date($scope.date).setDate($scope.date.getDate() + offset);
    };
    
    $scope.visibilityCalendar = function(){
        $scope.isCalendarVisible = !$scope.isCalendarVisible;
        if($scope.isCalendarVisible){
            $scope.wellDeviceHeight = heightDeviceMin;
        }
        else{
            $scope.wellDeviceHeight = heightDeviceMax;
        }
    };  
    
    $scope.goTo = function(value){
        $window.location.href = value;
    };
    
    $scope.toggle = function() {
        if ($scope.search.person.length != 0) {
            $scope.search.person = '';
        } else {
            $scope.search.person = endpoint.origin();
        }
    }
    
    $scope.$watch('search.assets', function() {
        if ($scope.search.assets == null) {
            $scope.search = {
                person: $scope.search.person
            };
        }
    })
    
    $scope.changeDate = function() {
        $scope.pick = $scope.pick ? false : true;
    };
    
    $scope.tomorrow = function() {
        $scope.date.setDate($scope.date.getDate() + 1);
    };
    
    $scope.yesterday = function() {
        $scope.date.setDate($scope.date.getDate() - 1);
    };
    
    $scope.getDate = function(y, m, d) {
        return new Date(y, m - 1, d);
    };
    
    endpoint.asset.list().success(function(data) {
        $scope.devices = data.items;
    });
    
    $scope.addDays = function(value){
        $scope.date.setDate($scope.date.getDate() + value);
    };
    
    
    $timeout(function() {
        var cal_height = $(window).height() - $("#header").height() - $("#news-sec").height() - $("#week-select").height() - $(".more-news").height() - 2;
        //console.log("here" + cal_height);
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            console.log("mozilla");
            $('.cal-day').height(750);
        }
        else {
            $('.cal-day').height(cal_height);
        }
        var scroll_height = $(".cal-day").height() - $(".cal-day .panel-heading").height() - 30;
        if(!$(".calendar-head").length){
            if(scroll_height != 0){
                $(".hour-picker-v-scroll-bar").height(scroll_height);
            }
            else {
                $(".hour-picker-v-scroll-bar").height(600);
            }    
        }
        $(".hour-picker-v-scroll-bar").scrollTop(460);
        $scope.$apply();
    }, 500);
    
});

calApp.controller("MenuCtrl", function($scope, endpoint, $timeout) {
    $scope.logo = {
        url:"../css/img/default_logo.png"
    };
    
    $scope.$on('reloadLocation', function(event, data) {
        $scope.initLoad();
    });
    
    
    
    $scope.initLoad = function(){
        endpoint.then(function(endpoint) {
            $scope.myName = function() {
                return endpoint.me().name;
            };
            $scope.location = function() {
                var location = endpoint.loc();
                return location;
            };
            
            endpoint.location.get($scope.location()).success(function(data) {
                $scope.getLogoUrl(data.logoUrl);
            });
            
            $timeout(function() {
                $scope.$apply();
            }, 500);
        });
    };
    
    $scope.initLoad();
    
    $scope.getLogoUrl = function(value){
        $scope.logo.url = "../css/img/default_logo.png";
        if(value != null
                && value.trim() != ""){
            $scope.logo.url = value;
        }
    };
});
calApp.controller("LocationDrawer", function($scope, endpoint, $window, $rootScope) {
    endpoint.then(function(endpoint) {
        $scope.set = function(loc) {
            endpoint.setLoc(loc);
            $rootScope.$broadcast('reloadLocation', "");
            $window.location.href = "#/reload";
        };
        
        $scope.active = function(loc) {
            return loc == endpoint.loc;
        };
        
        $scope.refresh = function() {
            endpoint.location.listActives().success(function(data) {
                $scope.locations = data.items;
            });
        };
        $scope.refresh();
    });
});

calApp.controller("GlobalCtrl", function($scope, endpoint) {
    $scope.add = function() {
        endpoint.person.grantGlobal($scope.admin).success(function() {
            $scope.feedback = "GLOBAL_SUCCESS";
        }).error(function(){
            $scope.feedback = "GLOBAL_FAILURE";
        });
    }
});

calApp.controller("ProfileCtrl", function($scope, $stateParams, endpoint, $window) {
    
    $scope.me = {};
    if($stateParams.id.trim() == "me"){
        $scope.me = endpoint.me();
    }
    else{
        endpoint.person.get($stateParams.id).success(function(data){
            $scope.me = data;
        });
    }
    
    $scope.submit = function() {
        if($scope.me.name != null
                && $scope.me.name.trim() != ""
                && $scope.me.startupName != null
                && $scope.me.startupName.trim() != ""){
            endpoint.person.updateProfile($stateParams.location,$scope.me.mail,$scope.me.name,$scope.me.startupName)
                    .success(function() {
                        $window.location.hash = "/";
            });
        }
    }
});