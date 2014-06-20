calApp.controller("ListAssetCtrl", function($scope, endpoint) {
    function refresh() {
        endpoint.asset.list().success(function(data) {
            $scope.assets = data.items;
        });
    }
    refresh();
    $scope.delete = function(id) {
        endpoint.asset.delete(id).success(refresh);
    };
});
calApp.controller("NewAssetCtrl", function($scope, endpoint) {
    $scope.a = {};
    $scope.submit = function() {
        if(!$scope.rgb){
            $scope.error = "ERROR_ASSET_COLOR";
            return;
        }
        if(!$scope.a.name){
            $scope.error = "ERROR_ASSET_NAME";
            return;
        }
        $scope.a.r = $scope.rgb.r;
        $scope.a.g = $scope.rgb.g;
        $scope.a.b = $scope.rgb.b;
        endpoint.asset.put($scope.a).success(function() {
            window.location.href = "#/asset/list";
        });
    };
});
calApp.controller("EditAssetCtrl", function($scope, $stateParams, endpoint) {
    $scope.a = {};
    $scope.submit = function() {
        $scope.a.r = $scope.rgb.r;
        $scope.a.g = $scope.rgb.g;
        $scope.a.b = $scope.rgb.b;
        endpoint.asset.put($scope.a).success(function() {
            window.location.href = "#/asset/list";
        });
    };

    endpoint.asset.get($stateParams.id).success(function(data) {
        $scope.a = data;
        $scope.rgb = {r: data.r, g: data.g, b: data.b}
    });
});