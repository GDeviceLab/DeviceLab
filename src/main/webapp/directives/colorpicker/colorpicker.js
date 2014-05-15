calApp.directive("colorPick", function() {
    return {
        scope: {
            model: '='
        },
        restrict: "EA",
        templateUrl: '/directives/colorpicker/colorpicker.html',
        controller: function($scope) {
            ColorPicker.fixIndicators(
                    document.getElementById('slider-indicator'),
                    document.getElementById('picker-indicator'));
            var skip = true;
            var cp = ColorPicker(
                    document.getElementById('slider'),
                    document.getElementById('picker'),
                    function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
                        $scope.model = rgb;
                        ColorPicker.positionIndicators(
                                document.getElementById('slider-indicator'),
                                document.getElementById('picker-indicator'),
                                sliderCoordinate, pickerCoordinate
                                );
                        if (!skip) {
                            $scope.$apply();
                        }
                        skip = false;
                    });
            $scope.$watch('""+r+g+b', function() {
                cp.setRgb($scope.model);
            });

        }
    }
})