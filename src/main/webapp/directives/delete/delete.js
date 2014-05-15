calApp.directive("calDelete", function(){
    return {
        scope: {
            action: '&',
            bClass: '@'
        },
        restrict: 'E',
        templateUrl: "/directives/delete/delete.html",
        replace: true,
        controller: function($scope){
            console.log($scope);
            $scope.delete = function(){
                $scope.action();
                $scope.show = false;
            };
        }
    };
});