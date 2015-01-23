calApp.controller("NewNewsCtrl", function($scope, $window, endpoint) {
    $scope.n = {expire: new Date()}
    $scope.submit = function() {
        endpoint.news.put($scope.n).success(function() {
            $window.location.hash = "/";
        });
    };
    
    $scope.goTo = function(){
        $window.location.hash = "/";
    };
});
calApp.controller("EditNewsCtrl", function($scope, $window, $stateParams, endpoint) {
    endpoint.news.get($stateParams.id).success(function(data) {
        $scope.n = data;
    });
    $scope.submit = function() {
        endpoint.news.put($scope.n).success(function() {
            $window.location.hash = "/";
        });
    };
    
    $scope.goTo = function(){
        $window.history.back();
    };
});
calApp.controller("ListNewsCtrl", function($scope, endpoint) {
    function refresh() {
        endpoint.news.fetch(0, 30).success(function(data) {
            $scope.news = data.items;
        });
    }
    refresh();
    $scope.delete = function(id){
        endpoint.news.delete(id).success(refresh);
    }
});