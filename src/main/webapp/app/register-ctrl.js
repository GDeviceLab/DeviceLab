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
            if(!endpoint.loading()){
                var cal_height = $(window).height() - $("#header").height() - $("#news-sec").height() - $("#week-select").height() - 2;
                //console.log("here" + cal_height);
                $('.cal-day').height(cal_height);
            }
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
            if(loc[1] === 'news'){
                if(loc[2] != null
                    && loc[2] == "new"){
                    $scope.page = "Add News";
                }
                else{
                    $scope.page = "News"; 
                }
            }
            return loc[1];
        }
    }, function(n){
        var value = n.charAt(0).toUpperCase() + n.slice(1);
        if(value == 'Stats'){
            value = 'My Stats';
        }
        else if(value == 'Asset'){
            value = 'Device';
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