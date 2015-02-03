calApp.directive("selectTimezone", function() {
    return({
        templateUrl: '/directives/selecttimezone/selecttimezone.html',
        restrict: 'E',
        scope: {
            offset: '='
        },
        controller: function($scope, $window, $filter, endpoint) {                        
            $scope.changeSelection = function(){
                console.log($scope.offset);
            };
        }
    });
});


