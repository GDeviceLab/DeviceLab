calApp.directive("calDelete", function(){
    return {
        scope: {
            action: '&',
            bClass: '@',
            propagation: '='
        },
        restrict: 'E',
        templateUrl: "/directives/delete/delete.html",
        replace: true,
        controller: function($scope){
            $scope.delete = function(){
                $scope.action();
                $scope.show = false;
                event.stopPropagation();
            };
            
            $scope.changeShow = function(value){
                $(".delete-modal").appendTo("body");
                $scope.show = value;
                if($scope.propagation){
                    event.stopPropagation();
                }
            };
        }
    };
});