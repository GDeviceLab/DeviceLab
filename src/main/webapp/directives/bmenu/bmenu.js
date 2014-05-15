calApp.directive("calMenu", function() {
    return {
        templateUrl: "/directives/bmenu/bmenu.html",
        restrict: 'E',
        transclude: true,
        scope: {
            mClass: '@',
            bClass: '@',
            value: '@',
            search: '=',
            data: '=in'
        },
        controller: function($scope, endpoint) {
            endpoint.then(function(endpoint) {
                $scope.$watch('togglePerson', function() {
                    if (!$scope.togglePerson) {
                        $scope.search.person = '';
                    } else {
                        $scope.search.person = endpoint.origin();
                    }
                });


                $scope.show = false;

                $scope.toggle = function() {
                    $scope.show = !$scope.show;
                };
            });
        }
    };
});