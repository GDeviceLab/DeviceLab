calApp.directive("calHourPicker", function() {
    return({
        templateUrl: '/directives/hourpicker/hourpicker.html',
        restrict: 'E',
        scope: {
            min: '@',
            max: '@',
            id: '@',
            date: '=',
            offset: '@',
            class: '@',
            filter: '='
        },
        controller: function($scope, $window, endpoint) {

            function dte(){
                return new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate() + $scope.offset*1);
            }
            console.log($scope.date);
            console.log(dte());
            
            endpoint.then(function(endpoint) {
                $scope.goto = function(id){
                    $window.location.href = "#/reservation/edit/" + id;
                };
                
                //bindings
                var start;
                var end;
                var active = false;
                function down(event) {
                    start = event.target.attributes["data-value"].value;
                    end = event.target.attributes["data-value"].value;
                    active = true;
                    draw($scope.id, start, end);
                }

                function up(event) {
                    if (!active) {
                        return;
                    }
                    var s = Math.min(start * 1, end * 1);
                    var e = Math.max(start * 1, end * 1);
                    active = false;
                    window.location.href = "#/reservation/new/" + dte().toJSON() + "/" + s + "/" + (e * 1 + 1);
                }

                function leave(event) {
                    active = false;
                    e = document.getElementById(id + "_" + "range").display = 'none';
                }

                function join(event) {
                    if (!active) {
                        return;
                    }
                    end = event.target.attributes["data-value"].value;
                    draw($scope.id, start, end);
                }


                var trg = document.getElementById($scope.id);
                trg.addEventListener("pointerdown", down, false);
                trg.addEventListener("pointerup", up, false);
                trg.addEventListener("pointerleave", leave, false);
                trg.addEventListener("pointermove", join, false);
                function draw(id, s, f) {

                    var begin = Math.min(s, f);
                    var end = Math.max(s, f);
                    var h = document.getElementById(id + "_" + begin).offsetHeight;
                    var w = document.getElementById(id + "_" + begin).offsetWidth;
                    var e = document.getElementById(id + "_" + "range");
                    e.style.top = (begin - 2*$scope.min + 1) * h;
                    e.style.height = (end - begin + 1) * h;
                    e.style.left = 26;
                    e.style.width = w;
                    e.style.display = "block";
                }

                //Reservations
                function refreshRes() {
                    endpoint.res.list(dte()).success(function(data) {
                        if (data.items) {
                            for (var i = 0; i < data.items.length; i++) {
                                var event = data.items[i];
                                var h = document.getElementById($scope.id + "_" + event.start).offsetHeight;
                                var w = document.getElementById($scope.id + "_" + event.start).offsetWidth;
                                event.top = h * (event.start - 2*$scope.min + 1)
                                event.height = (event.end - event.start) * h;
                                event.width = w;
                                var colors = [];
                                for (var j = 0; j < event.assets.length; j++) {
                                    colors.push('rgba(' + event.assets[j].r + ',' + event.assets[j].g + ',' + event.assets[j].b + ',0.5)');
                                }
                                event.gradient = colors.join(',');
                                if (colors.length == 1) {
                                    event.gradient = event.gradient + ', ' + event.gradient;
                                }
                            }
                        }
                        $scope.events = data.items;
                    });
                }
                refreshRes();
                $scope.$watch(function(){
                    return $scope.date.toJSON();
                }, refreshRes);
                //Logic
                $scope.hours = [];
                var min = $scope.min * 1;
                var max = $scope.max * 1;
                for (var i = min; i <= max; i++) {
                    $scope.hours.push(i);
                }
            });
        }
    });
});


