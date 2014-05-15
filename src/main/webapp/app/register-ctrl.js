calApp.controller("RegisterCtrl", function($scope, endpoint, $window) {
    $scope.show = false;
    $scope.loading = function(){
        return true;
    };
    endpoint.then(function(endpoint) {
        $scope.show = endpoint.show()

        $scope.loading = function() {
            return endpoint.loading();
        }
        $scope.submit = function() {
            endpoint.person.register($scope.name)
                    .success(function() {
                        $window.location.hash = "/apply"
                        $scope.show = false;
                        ndp.callMe();
                    });
        }
    });
});