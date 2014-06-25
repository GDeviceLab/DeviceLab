calApp.directive('calLink', function() {
    return {
        restrict: 'A',
        scope: {
            calLink: "@"
        },
        link: function($scope, element, attributes) {
            var a = attributes.calLink;
            element.on("click", function(){
                location.href = a;
            });
        }
    };
});