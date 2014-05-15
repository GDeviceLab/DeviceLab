calApp.directive('newsFeed', function() {
    return {
        templateUrl: '/directives/newsfeed/newsfeed.html',
        restrict: 'EA',
        scope: {
            limit: "@",
            rank: "@",
            pClass: "@"
        },
        controller: function($scope, endpoint) {
            endpoint.then(function(endpoint) {
                endpoint.news.fetch($scope.rank, $scope.limit).success(function(data) {
                    $scope.news = data.items;
                });
            });
        }
    }
})