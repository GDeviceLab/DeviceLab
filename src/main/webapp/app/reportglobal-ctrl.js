calApp.controller("ReportGlobalCtrl", function ($scope, $rootScope, $stateParams, endpoint, $window) {
    $scope.locations = {};
    $scope.locations.selected = [];
    $scope.dateFilter = {};
    $scope.reportType = null;

    endpoint.location.list().success(function (data) {
        $scope.locations = data;
        $scope.locations.selected = [];
    });

    $scope.submit = function () {
        
        if($scope.locations.selected.length <= 0){
            $scope.error = "ERROR_LOCATIONS_SELECTED";
            return;
        }
        
        if($scope.reportType == null){
            $scope.error = "ERROR_REPORT_SELECTED";
            return;
        }
        
        if('REPORT_GLOBAL_LOCATION_DEVICE_REPORT' == $scope.reportType){
            endpoint.rep.globalLocationDevicesReport($scope.locations.selected, $scope.dateFilter.from, $scope.dateFilter.to)
                    .success(function (data) {
                        $rootScope.reportResult = data;
                $window.location.href = "#/report/globalLocationDevicesReport";
            });
        }
        else if('REPORT_TESTED_PURPOSES' == $scope.reportType){
            endpoint.rep.testedPurposes($scope.locations.selected, $scope.dateFilter.from, $scope.dateFilter.to)
                    .success(function (data) {
                        $rootScope.reportResult = data;
                $window.location.href = "#/report/testedPurposesReport";
            });
        }
        
    };

    $scope.checkAll = function () {
        $scope.locations.selected = angular.copy($scope.locations.items);
    };

    $scope.uncheckAll = function () {
        $scope.locations.selected = [];
    };

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

calApp.controller("ResultReportCtrl", function ($scope, $rootScope, $stateParams, endpoint, $window) {
    console.log($rootScope.reportResult);
});
