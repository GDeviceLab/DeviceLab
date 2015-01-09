calApp.controller("RegisterCtrl", function($scope, endpoint, $window) {
    $scope.show = false;
    $scope.loading = function() {
        return true;
    };
    
    $scope.error = {
        mandatoryMessage:false
    };
    
    endpoint.then(function(endpoint) {
        $scope.show = endpoint.show()

        $scope.loading = function() {
            return endpoint.loading();
        }
        $scope.submit = function() {
            $scope.error.mandatoryMessage = false;
            if($scope.name != null
                 && $scope.name.trim() != ""
                 && $scope.startupName != null
                 && $scope.startupName.trim() != ""){
                endpoint.person.register($scope.name,$scope.startupName)
                    .success(function() {
                        $window.location.hash = "/apply"
                        $scope.show = false;
                        ndp.callMe();
                    });
            }
            else{
                $scope.error.mandatoryMessage = true;
            }
        }
    });
});

calApp.controller("TitleCtrl", function($scope, endpoint, $window) {
    $scope.page = "???";
    $scope.location = "???";
    
    $scope.$watch(function(){
        var loc = $window.location.hash.split('/');
        if(loc.length < 2){
            return "home";
        } else {
            return loc[1];
        }
    }, function(n){
        var value = n.charAt(0).toUpperCase() + n.slice(1);
        console.log(value);
        if(value == 'News'){
            value = 'Add News';
        }
        else if(value == 'Stats'){
            value = 'My Stats';
        }
        $scope.page = value;
    });
    
    endpoint.then(function(endpoint) {
        $scope.$watch(endpoint.loc, function() {
            if (endpoint.loc() != -1) {endpoint.location.get(endpoint.loc()).success(function(data) {
                    $scope.location = data.name;
                }).error(function(data) {
                    $scope.location = "[ERROR]";
                });
            } else {
                $scope.location = "[No Location]";
            }
        });
    });
});