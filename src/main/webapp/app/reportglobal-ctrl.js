calApp.controller("ReportGlobalCtrl", function ($scope, $stateParams, endpoint, $window) {
    $scope.locations = {};
    $scope.locations.selected = [];
    $scope.dateFilter = {};

    endpoint.location.list().success(function (data) {
        $scope.locations = data;
    });


    $scope.submit = function () {
        endpoint.rep.globalLocationReport($scope.locations.selected, $scope.dateFilter.from, $scope.dateFilter.to)
                .success(function (data) {
                    //data;
                });
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
        lastDate.setDate(1);
        $scope.dateFilter.to = lastDate;
    };

    $scope.filterDateThisQuarter = function () {
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 2);
        $scope.dateFilter.to = currentDate;
        $scope.dateFilter.from = new Date();
    };

    $scope.frombeginning = function () {
        $scope.dateFilter.from = null;
        $scope.dateFilter.to = null;
    };

    $scope.filterDateLastQuarter = function () {
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);
        $scope.dateFilter.from = currentDate;
        $scope.dateFilter.to = new Date();
    };


});
