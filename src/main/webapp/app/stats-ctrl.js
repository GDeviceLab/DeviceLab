calApp.controller("DevicesStatsCtrl", function($scope, endpoint) {
    $scope.dateFilter = {};
        
    
    
    $scope.submit = function(){
        endpoint.stats.devicesDateFilter($scope.dateFilter.from, $scope.dateFilter.to).success(function(data) {
            $scope.stats = data.items;
        });
    };
    /*endpoint.stats.devices().success(function(data) {
        $scope.stats = data.items;
    });*/
    $scope.submit();
    
    $scope.filterDateThisYear = function () {
        var firstDate = new Date();
        firstDate.setMonth(0);
        firstDate.setDate(1);
        $scope.dateFilter.from = firstDate;
        var lastDate = new Date();
        lastDate.setMonth(11);
        lastDate.setDate(31);
        $scope.dateFilter.to = lastDate;
    };
    
    $scope.filterDateThisQuarter = function () {
        var currentDate = new Date();
        var quarter = Math.floor((currentDate.getMonth() / 3));	
        $scope.dateFilter.from =  new Date(currentDate.getFullYear(), quarter * 3, 1);
        $scope.dateFilter.to = new Date( $scope.dateFilter.from.getFullYear(),  
        $scope.dateFilter.from.getMonth() + 3, 0);
    };
    
    $scope.filterDateLastQuarter = function () {
        var d = new Date();
        var quarter = Math.floor((d.getMonth() / 3));	   
        $scope.dateFilter.from = new Date(d.getFullYear(), quarter * 3 - 3, 1);
        $scope.dateFilter.to =  new Date($scope.dateFilter.from.getFullYear(), 
        $scope.dateFilter.from.getMonth() + 3, 0);
    };
    
    $scope.reset = function () {
        $scope.dateFilter.from = null;
        $scope.dateFilter.to = null;
    };
});
calApp.controller("DeviceStatsCtrl", function($scope, $stateParams, endpoint) {
    endpoint.stats.device($stateParams.id).success(function(data) {
        $scope.stats = data;
    });
});
calApp.controller("PersonStatsCtrl", function($scope, $stateParams, endpoint) {
    endpoint.stats.person($stateParams.id).success(function(data) {
        $scope.stats = data;
    });
});
calApp.controller("MyStatsCtrl", function($scope, endpoint){
    /*endpoint.stats.person(endpoint.me().mail).success(function(data){
        $scope.stats = data;
    });*/
    
    $scope.dateFilter = {};
    
    $scope.submit = function(){
        endpoint.stats.personDateFilter(endpoint.me().mail, $scope.dateFilter.from, $scope.dateFilter.to).success(function(data) {
            $scope.stats = data;
        });
    };
    /*endpoint.stats.devices().success(function(data) {
        $scope.stats = data.items;
    });*/
    $scope.submit();
    
    $scope.filterDateThisYear = function () {
        var firstDate = new Date();
        firstDate.setMonth(0);
        firstDate.setDate(1);
        $scope.dateFilter.from = firstDate;
        var lastDate = new Date();
        lastDate.setMonth(11);
        lastDate.setDate(31);
        $scope.dateFilter.to = lastDate;
    };
    
    $scope.filterDateThisQuarter = function () {
        var currentDate = new Date();
        var quarter = Math.floor((currentDate.getMonth() / 3));	
        $scope.dateFilter.from =  new Date(currentDate.getFullYear(), quarter * 3, 1);
        $scope.dateFilter.to = new Date( $scope.dateFilter.from.getFullYear(),  
        $scope.dateFilter.from.getMonth() + 3, 0);
    };
    
    $scope.filterDateLastQuarter = function () {
        var d = new Date();
        var quarter = Math.floor((d.getMonth() / 3));	   
        $scope.dateFilter.from = new Date(d.getFullYear(), quarter * 3 - 3, 1);
        $scope.dateFilter.to =  new Date($scope.dateFilter.from.getFullYear(), 
        $scope.dateFilter.from.getMonth() + 3, 0);
    };
    
    $scope.reset = function () {
        $scope.dateFilter.from = null;
        $scope.dateFilter.to = null;
    };
});