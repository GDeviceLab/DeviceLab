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
    
    $scope.itemsPerPage = 4;
    $scope.currentPage = 0;
    $scope.news = [];
    
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    
    $scope.pageCount = function() {
        return Math.ceil($scope.news.length/$scope.itemsPerPage)-1;
    };
    
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
    
    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
    
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