calApp.controller("NewReservationCtrl", function($scope, $stateParams, $window, endpoint) {
    var hashmap = {};
    $scope.error = {};
    $scope.sassets = [{value: "", number: 0}];
    $scope.purpose = {};
    $scope.listPurpose = [];
    $scope.r = {};
    
    endpoint.pur.list().success(function(data) {
        if(data != null
            && data.items != null
            && data.items.length > 0){
            $scope.listPurpose = data.items;
            // set the last purpose created or edited as the default purpose
            $scope.purpose = $scope.listPurpose[0];
            $scope.r.idPurpose = $scope.purpose.id;
        }
    });
    
    $scope.selectPurpose = function(){
        if($scope.selectedPurDS != "-1"){
            var objCopy = JSON.parse($scope.selectedPurDS);
            $scope.r.idPurpose = objCopy.id;
            $scope.purpose.person = objCopy.person;
            $scope.purpose.type = objCopy.type;
            $scope.purpose.title = objCopy.title;
        }
        else{
            $scope.r.idPurpose = null;
            $scope.purpose = {};
        }
    };
    
    $scope.changePurposeType = function(){
        var type = $scope.purpose.type;
        if("MOBILE_APP" == type){
            $scope.purpose.titlePlaceHolder = "MOBILE_APP_TITLE_PH";
        }
        else if("WEB_SITE" == type){
            $scope.purpose.titlePlaceHolder = "WEB_SITE_TITLE_PH";
        }
        else if("OTHER" == type){
            $scope.purpose.titlePlaceHolder = "OTHER_TITLE_PH";
        }
    };

    $scope.addAsset = function() {
        $scope.sassets.push({value: "", number: $scope.sassets.length});
    };

    $scope.removeAsset = function(id) {
        $scope.sassets.splice(id, 1);
        for (var i = id; i < $scope.sassets.length; i++) {
            $scope.sassets[i].number--;
        }
    };

    endpoint.asset.list().success(function(data) {
        $scope.assets = data.items;
        for (var i = 0; i < data.items.length; i++) {
            hashmap[data.items[i].id] = data.items[i];
        }
    });
    
    // set default name of the startup
    if(endpoint !== null){
        var personObj = endpoint.me();
        if(personObj !== null
              && personObj.startupName !== null){
            $scope.r.title = personObj.startupName;
        }
    }
    
    $scope.date = new Date($stateParams.date);
    $scope.r.date = new Date($stateParams.date);

    $scope.r.start = $stateParams.start;
    $scope.r.end = $stateParams.end;

    $scope.getDate = function(y, m, d) {
        return new Date(y, m - 1, d);
    };

    $scope.$watch(function() {
        return $scope.r.start;
    }, function() {
        if ($scope.r.start * 1 >= $scope.r.end * 1) {
            $scope.r.end = $scope.r.start * 1 + 1;
        }
    });
    $scope.$watch(function() {
        return $scope.r.end;
    }, function() {
        if ($scope.r.start * 1 >= $scope.r.end * 1) {
            $scope.r.start = $scope.r.end * 1 - 1;
        }
    });

    $scope.submit = function() {
        $scope.r.assets = [];
        $scope.r.date = $scope.date;
        for (var i = 0; i < $scope.sassets.length; i++) {
            $scope.r.assets.push(hashmap[$scope.sassets[i].value]);
        }
        endpoint.res.put($scope.r,$scope.purpose).success(function() {
            $window.location.href = "#/";
        }).error(function(data) {
            if (data.error && data.error.message === "java.lang.Exception: RESERVATION COLLISION") {
                $scope.error.collision = true;
            }
            ;
        });

    };
});
calApp.controller("EditReservationCtrl", function($scope, $stateParams, endpoint, $window) {
    var hashmap = {};
    var deleted = false;
    $scope.error = {};
    $scope.sassets = [];
    $scope.purpose = {};
    $scope.listPurpose = [];
    
    endpoint.pur.list().success(function(data) {
        if(data != null
            && data.items != null
            && data.items.length > 0){
            $scope.listPurpose = data.items;
        }
    });
    
    $scope.selectPurpose = function(){
        if($scope.selectedPurDS != "-1"){
            var objCopy = JSON.parse($scope.selectedPurDS);
            $scope.r.idPurpose = objCopy.id;
            $scope.purpose.person = objCopy.person;
            $scope.purpose.type = objCopy.type;
            $scope.purpose.title = objCopy.title;
        }
        else{
            $scope.r.idPurpose = null;
            $scope.purpose = {};
        }
    };
    
    $scope.changePurposeType = function(){
        $scope.purpose.title = null;
        var type = $scope.purpose.type;
        if("MOBILE_APP" == type){
            $scope.purpose.titlePlaceHolder = "MOBILE_APP_TITLE_PH";
        }
        else if("WEB_SITE" == type){
            $scope.purpose.titlePlaceHolder = "WEB_SITE_TITLE_PH";
        }
        else if("OTHER" == type){
            $scope.purpose.titlePlaceHolder = "OTHER_TITLE_PH";
        }
    };
    
    $scope.addAsset = function() {
        $scope.sassets.push({value: "", number: $scope.sassets.length});
    };

    $scope.removeAsset = function(id) {
        $scope.sassets.splice(id, 1);
        for (var i = id; i < $scope.sassets.length; i++) {
            $scope.sassets[i].number--;
        }
    };

    $scope.delete = function() {
        endpoint.res.delete($stateParams.id).success(function() {
            $window.location.href = "#/calendar";
        });
    };

    endpoint.asset.list().success(function(data) {

        $scope.assets = data.items;
        for (var i = 0; i < data.items.length; i++) {
            hashmap[data.items[i].id] = data.items[i];
        }
        endpoint.res.get($stateParams.id).success(function(data) {
            $scope.r = data;
            $scope.purpose = $scope.r.purpose;
            $scope.$watch(function() {
                return $scope.r.start;
            }, function() {
                if ($scope.r.start * 1 >= $scope.r.end * 1) {
                    $scope.r.end = $scope.r.start * 1 + 1;
                }
            });
            $scope.$watch(function() {
                return $scope.r.end;
            }, function() {
                if ($scope.r.start * 1 >= $scope.r.end * 1) {
                    $scope.r.start = $scope.r.end * 1 - 1;
                }
            });
            $scope.date = new Date(data.date);
            for (var i = 0; i < data.assets.length; i++) {
                if (data.assets[i].active === false) {
                    deleted = true; //Presence of a deleted device
                }
                $scope.sassets.push({value: data.assets[i].id, number: $scope.sassets.length, raw: data.assets[i]});
            }
            ;
        });
    });

    $scope.getDate = function(y, m, d) {
        return new Date(y, m - 1, d);
    };
    $scope.submit = function() {
        $scope.r.assets = [];
        $scope.r.date = $scope.date;
        for (var i = 0; i < $scope.sassets.length; i++) {
            $scope.r.assets.push(hashmap[$scope.sassets[i].value]);
        }
        endpoint.res.put($scope.r,$scope.purpose).success(function() {
            window.location.href = "#/";
        }).error(function(data) {
            if (data.error && data.error.message === "java.lang.Exception: RESERVATION COLLISION") {
                $scope.error.collision = true;
            }
            ;
            if (deleted) {
                $scope.error.deleted = true;
            }
            ;
        });
        ;
    };
});