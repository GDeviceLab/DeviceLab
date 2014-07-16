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
                endpoint.news.active().success(function(data) {
                    $scope.news = data.items;
                });
            });
        }
    }
})