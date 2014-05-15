//Disable .prop( "disabled", false );
calApp.directive("calEnableOwner", function() {
    return {
        restrict: 'A',
        scope: {calEnableOwner:"@"},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.prop( "disabled", false );
                } else {
                    element.prop( "disabled", true );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.owner($scope.calEnableOwner);
                };

            });
        }
    };
});

calApp.directive("calEnableGlobal", function() {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.prop( "disabled", false );
                } else {
                    element.prop( "disabled", true );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.global();
                };

            });
        }
    };
});

calApp.directive("calEnableLocal", function() {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.prop( "disabled", false );
                } else {
                    element.prop( "disabled", true );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.local();
                };

            });
        }
    };
});

//Hide

calApp.directive("calShowOwner", function() {
    return {
        restrict: 'A',
        scope: {calShowOwner:"@"},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.css( "display", "" );
                } else {
                    element.css( "display", "none" );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.owner($scope.calShowOwner);
                };

            });
        }
    };
});

calApp.directive("calShowGlobal", function() {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.css( "display", "" );
                } else {
                    element.css( "display", "none" );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.global();
                };

            });
        }
    };
});

calApp.directive("calShowLocal", function() {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attributes) {
            $scope.$watch(function() {
                return $scope.trigger();
            }, function() {
                if ($scope.trigger()) {
                    element.css( "display", "" );
                } else {
                    element.css( "display", "none" );
                }
            });
        },
        controller: function($scope, endpoint) {
            $scope.trigger = function() {
                return 0;
            };
            
            endpoint.then(function(endpoint) {
                $scope.trigger = function() {
                    return endpoint.local();
                };

            });
        }
    };
});