calApp.controller("ReloadCtrl", function($window) {
    $window.location.hash = "#/calendar";
});

calApp.controller("CalendarCtrl", function($scope, $rootScope, endpoint,$window) {
    $scope.search = {};
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
    
    
    $scope.goTo = function(value){
        console.log("goto");
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