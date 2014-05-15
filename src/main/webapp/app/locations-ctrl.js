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
calApp.controller("ListLocationCtrl", function($scope, endpoint) {
    endpoint.location.list().success(function(data) {
        $scope.locations = data;
    });
});
calApp.controller("EditLocationCtrl", function($scope, $stateParams, endpoint, $window) {
    $scope.id = $stateParams.id;
    $scope.state = 'pending';
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
    });

    $scope.toUser = function(user) {
        endpoint.person.promote(user, $scope.id)
                .success(refresh);
    };
    $scope.delete = function(user) {
        endpoint.person.demote(user, $scope.id)
                .success(refresh);
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
