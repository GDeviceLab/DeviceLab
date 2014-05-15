calApp.controller("TypeListCtrl", function($scope, $http){
    $http.get('/_ah/api/type/v1/list').success(function(data){
        $scope.types = data.items;
    });
});
calApp.controller("TypeNewCtrl", function($scope, $http){
    $scope.submit = function(){
        $http.post('/_ah/api/type/v1/put', $scope.t).success(function(){
            window.location.href = "#/type";
        });
    };
});
calApp.controller("TypeEditCtrl", function($scope, $stateParams, $http){
    $scope.submit = function(){
        $http.post('/_ah/api/asset/v1/put', $scope.a).success(function(){
            window.location.href = "#/type";
        });
    };
    $http.get('/_ah/api/type/v1/get?id='+$stateParams.id).success(function(data){
        $scope.t = data;
    });
});