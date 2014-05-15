calApp.directive("newsWidget", function() {
    return {
        restrict: "EA",
        templateUrl: "/directives/newswidget/newswidget.html",
        scope: true,
        controller: function($scope, endpoint, $interval) {
            endpoint.then(function(endpoint) {
                function load() {
                    if ($scope.show == false) {
                        if (endpoint.loc() != -1 && endpoint.loc()) {
                            endpoint.news.latest().success(function(data) {
                                $scope.news = data.items;
                                $scope.count = data.items.length;
                            });
                        }
                    }
                }

                $scope.$watch(function($scope) {
                    return endpoint.loc();
                }, load);
                load();
                $interval(load, 30000);
                $scope.show = false;
                $scope.open = function() {
                    if ($scope.count > 0) {
                        $scope.show = true;
                        endpoint.news.read();
                        $scope.count = 0;
                    }
                };
                $scope.close = function() {
                    $scope.show = false;
                };
            });
        }
    };
});