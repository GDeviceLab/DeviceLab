calApp.controller("DevicesStatsCtrl", function($scope, endpoint) {
    endpoint.stats.devices().success(function(data) {
        $scope.stats = data.items;
    });
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
    endpoint.stats.person(endpoint.me().mail).success(function(data){
        $scope.stats = data;
    });
});