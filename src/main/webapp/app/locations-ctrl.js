calApp.controller("ApplyLocationCtrl", function($scope, endpoint) {
    $scope.state = {};
    $scope.apply = function(location) {
        endpoint.person.apply(location).success(function() {
            if (!$scope.state[location]) {
                $scope.state[location] = 'PENDING';
            }
        });
    };
    $scope.pending = function(loc) {
        return $scope.state[loc] === 'PENDING';
    };
    $scope.user = function(loc) {
        return $scope.state[loc] === 'USER' || $scope.state[loc] === 'ADMIN';
    };

    endpoint.location.list().success(function(data) {
        $scope.locations = data.items;
    });
    endpoint.person.status().success(function(data) {
        for (var i = 0; i < data.items.length; i++) {
            $scope.state[data.items[i].location] = data.items[i].status;
        }
    });
});
calApp.controller("ListLocationCtrl", function($scope, endpoint, $window) {
    
    $scope.getList = function(){
        endpoint.location.list().success(function(data) {
            $scope.locations = data;
        });
    };
    
    $scope.delete = function(locationId){
        endpoint.location.delete(locationId).success(function(data) {
            $scope.getList();
        });
    };
    
    $scope.goTo = function(value){
        $window.location.hash = value;
    };
    
    $scope.test = function(event){
        console.log(event);
        
    };
    
    $scope.getList();
});
calApp.controller("EditLocationCtrl", function($scope, $stateParams, endpoint, $window, $upload, $http, $timeout) {
    $scope.id = $stateParams.id;
    $scope.state = 'pending';
    $scope.uploading = false;
    $scope.logoUrl = "../css/img/default_logo.png";
    
    $scope.showDeleteLocationButton = endpoint.me().globalAdmin;
    
    $scope.goTo = function(value){
        $window.location.href = value;
    };
    
    $scope.submit = function() {
        endpoint.location.put({
            name: $scope.name,
            id: $scope.id
        }).success(function() {
            $window.location.href = "#/location/list";
        });
    };
    endpoint.location.get($scope.id).success(function(data) {
        $scope.name = data.name;
        $scope.getLogoUrl(data.logoUrl);
    });

    $scope.toUser = function(user) {
        endpoint.person.promote(user, $scope.id)
                .success(refresh);
    };
    
    removeFromList = function(list,user){
        if(list != null
                && list.length > 0
                && user != null){
            var tempList = [];
            for (var i = 0; i < list.length; i++) {
                if(user != list[i].mail){
                    tempList.push(list[i]);
                }
            }
            return tempList; 
        }
    };
    
    removeUser = function(user){
        $scope.admins = removeFromList($scope.admins,user);
        $scope.pendings = removeFromList($scope.pendings,user);
        $scope.users = removeFromList($scope.users,user);
    };
    
    
    $scope.delete = function(user) {
        endpoint.person.demote(user, $scope.id)
                .success(removeUser(user));
    };
    $scope.toAdmin = function(user) {
        endpoint.person.grantLocal(user, $scope.id)
                .success(refresh);
    };

    $scope.select = function(user) {
        $scope.selected = user;
    };

    refresh = function() {
        $scope.selected = '';
        endpoint.person.listAdmins($scope.id).success(function(data) {
            $scope.admins = data.items;
        });
        endpoint.person.listPending($scope.id).success(function(data) {
            $scope.pendings = data.items;
        });
        endpoint.person.listActives($scope.id).success(function(data) {
            $scope.users = data.items;
        });
        
        $scope.loadUploadUrl();
    };

    $scope.onFileSelect = function($files) {
        console.log($files);
        $scope.uploading = true;
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: $scope.uploadUrl,
                method: 'POST',
                headers: {'locationId': $scope.id},
                file: file
            }).progress(function(evt) {
                var percent = parseInt(100.0 * evt.loaded / evt.total);
                console.log('percent: ' + percent);
            }).success(function(data, status, headers, config) {
                console.log("File Uploaded Successfully!");
                console.log(status);
                $files = [];
                $timeout(function() {
                    $scope.uploading = false;
                    location.reload();
                }, 2000);
            });
        }
    };
    
    $scope.loadUploadUrl = function(){
        $http.get("LogoUpload").success(function(output){
            $scope.uploadUrl = output;
        });
    };
    
    $scope.getLogoUrl = function(value){
        $scope.logoUrl = "../css/img/default_logo.png";
        if(value != null
                && value.trim() != ""){
            $scope.logoUrl = value;
        }
    };
    
    refresh();
    
});
calApp.controller("NewLocationCtrl", function($scope, endpoint, $window) {
    $scope.submit = function() {
        endpoint.location.put({
            name: $scope.name
        }).success(function() {
            $window.location.href = "#/location/list";
        });
    };
});

calApp.controller("LocationHistoryCtrl", function($scope, endpoint, $window, $stateParams) {
    $scope.resList = [];
    
    endpoint.res.totalhistory($stateParams.id).success(function(output) {
        if(output != null){
            $scope.resList = output.items;
        }
    });
});

calApp.controller("LocationCurrentStatusReservationCtrl", function($scope, endpoint, $window, $stateParams) {
    $scope.pojoResult = [];
    
    var dateNow = new Date();
    var numHour = dateNow.getHours()*2;
    console.log("NumHour: " + numHour);    
    var numMinutes = 0;
    if(dateNow.getMinutes() > 29){
        numMinutes = 1;
        console.log("NumMin if magg di 30: " + numMinutes);
    }
    var totalHalfHour = numHour + numMinutes;
    console.log("TotalHour: " + totalHalfHour);
    
    endpoint.res.devicesStatusList($stateParams.id,totalHalfHour).success(function(output) {
        if(output != null){
            $scope.pojoResult = output.items;
        }
    });
});
