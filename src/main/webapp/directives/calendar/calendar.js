//Year is yyyy
//Month is in the form 0-11
//Day is 1-31

function getCalendar(year, month, day) {
    var days = new Date(year, month + 1, 0).getDate();
    var offset = new Date(year, month, 1).getDay() - 1;
    offset = offset === -1 ? 6 : offset;
    var lines = Math.ceil((days + offset) / 7);
    var cal = [];
    var actual_day = 1 - offset;
    for (var l = 0; l < lines; l++) {
        var row = [];
        for (var c = 0; c < 7; c++) {
            row.push({
                id: actual_day,
                number: new Date(year, month, actual_day).getDate(),
                otherMonth: actual_day < 1 || actual_day > days,
                selected: actual_day === day,
                today: actual_day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            });
            actual_day++;
        }
        cal.push(row);
    }
    return cal;
}

calApp.directive("calEndar", function() {
    return {
        templateUrl: '/directives/calendar/calendar.html',
        restrict: 'E',
        scope: {
            date: '=',
            class: '@',
            btnClass: '@',
            viscalmethod: '&'
        },
        controller: function($scope) {
            $scope.changeMonth = function(offset){
                $scope.date = new Date($scope.date.getFullYear(), $scope.date.getMonth() + offset, 1 );
            }
            
            $scope.today = function(){
                $scope.date = new Date();
            }
            
            $scope.visibilityCalendar = function(){
                $scope.viscalmethod();
            }
            
            function refreshCal() {
                var d = new Date($scope.date);
                $scope.cal = getCalendar(d.getFullYear(), d.getMonth(), d.getDate());
            }
            
            refreshCal();
            $scope.$watch(function(){
                return new Date($scope.date).toJSON();
            }, refreshCal);

            $scope.select = function(day) {
                console.log(day);
                $scope.date.setDate(day);
            };
        }
    };
});