calApp.controller("ReloadCtrl", function($window) {
    $window.location.hash = "#/calendar";
});

calApp.controller("CalendarCtrl", function($scope, $rootScope, endpoint,$window) {
    var heightDeviceMax = 275;
    var heightDeviceMin = 80;
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
});

calApp.controller("MenuCtrl", function($scope, endpoint) {
    endpoint.then(function(endpoint) {
        $scope.myName = function() {
            return endpoint.me().name;
        };
        $scope.location = function() {
            return endpoint.loc();
        };
    });
});
calApp.controller("LocationDrawer", function($scope, endpoint, $window) {
    endpoint.then(function(endpoint) {
        $scope.set = function(loc) {
            endpoint.setLoc(loc);
            $window.location.href = "#/reload"
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