calApp.directive("calStar", function() {
    return {
        restrict: 'E',
        templateUrl: '/directives/favorite/favorite.html',
        scope: {
            location: '='
        },
        controller: function($scope, endpoint) {
            endpoint.then(function(endpoint) {
                $scope.star = function() {
                    return $scope.location === endpoint.favorite ? 'icon-star' : 'icon-star-o';
                }

                $scope.select = function() {
                    if (endpoint.favorite !== $scope.location) {
                        endpoint.favorite = $scope.location;
                        endpoint.person.favorite($scope.location);
                    }
                }
            });
        }
    }
})