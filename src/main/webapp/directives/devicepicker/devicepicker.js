calApp.directive('devicePicker', function() {
    return {
        templateUrl: '/directives/devicepicker/devicepicker.html',
        restrict: 'EA',
        scope: {
            filter: "=",
            heightpx:"="
        },
        controller: function($scope, endpoint) {
            $scope.devices = [];
            $scope.filter = [];
            
            $scope.background = function(){
                if(this.d.selected){
                    return "rgba("+this.d.r+","+this.d.g+","+this.d.b+",0.5)";
                } else {
                    return "inherit";
                }
            };
            
            $scope.click = function(){
                this.d.selected = !this.d.selected;
                if(this.d.selected){
                    $scope.filter.push(this.d.id);
                } else {
                    var temp = [];
                    for(var i = 0; $scope.filter.length > i; i++){
                        if($scope.filter[i] !== this.d.id){
                            temp.push($scope.filter[i]);
                        }
                    }
                    $scope.filter = temp;
                }
            };
            
            endpoint.then(function(endpoint) {
                endpoint.asset.list().success(function(data){
                    $scope.devices = data.items;
                });
            });
        }
    };
});