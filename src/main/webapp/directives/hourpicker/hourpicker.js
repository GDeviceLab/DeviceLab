calApp.directive("calHourPicker", function() {
    return({
        templateUrl: '/directives/hourpicker/hourpicker.html',
        restrict: 'E',
        scope: {
            min: '@',
            max: '@',
            marginmobile: '@',
            id: '@',
            date: '=',
            offset: '@',
            class: '@',
            filter: '='
        },
        controller: function($scope, $window, $filter, endpoint) {
            
            function getRealDateString(date,offset) {
                if(date != null){
                    var lDay = date.getDate()+ offset*1;
                    var lMonth = date.getMonth() + 1;
                    var lYear = date.getFullYear();

                    if (lDay < 10) {
                        lDay = '0' + lDay;
                    }

                    if (lMonth < 10) {
                        lMonth = '0' + lMonth;
                    }
                    return lYear + lMonth + lDay;
                }
                return null;
            }

            function dte(){
                var d = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate() + $scope.offset*1);
                return d;
            }
            
            $scope.borderStriped = function(hour){
                if(hour%2 === 1){
                    return "solid";
                }
                return "dashed";
            };
            
            $scope.zeroPadding = function(hour){
                if(10 > hour){
                    return "0"+hour;
                }
                return hour;
            }
            
            endpoint.then(function(endpoint) {
                $scope.goto = function(id){
                    $window.location.href = "#/reservation/edit/" + id;
                };
                
                //bindings
                var start;
                var end;
                var active = false;
                var pecentageWidthTotal = 70;
                
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
                    if(angular.isDefined(event.target.attributes["data-value"])){
                        end = event.target.attributes["data-value"].value;
                        draw($scope.id, start, end);
                    }
                }
                
                function collide( a,  b) {
                    //Reservations have to be valid
                    if(a.end <= a.start){
                        return true;
                    }
                    if(b.end <= b.start){
                        return true;
                    }
                    //A reservation cannot collide with herself
                    if (a.id === b.id) {
                        return false;
                    }
                    //Just in case : a reservation can oly collide on a reservation on the same day
                    if (a.date !== b.date) {
                        return false;
                    }
                    //Checking if hours does overlap
                    if(a.end <= b.start || b.end <= a.start){
                        //Doesn't overlap
                        return false;
                    }
                    return true;
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
                    e.style.top = (begin - 2*$scope.min) * h + 10;
                    e.style.height = (end - begin + 1) * h;
                    e.style.left = 49;
                    e.style.width = w;
                    e.style.display = "block";
                }
                
                function calculate_space(events){
                    var col_inc = 1;
                    angular.forEach(events, function(event) {
                        //calculate width 
                        if(event.num_collision === 0){
                            event.width = pecentageWidthTotal; 
                            event.width_perc = event.width + "%"; 
                            event.right = 5 + "%";
                        }else{
                            event.width = pecentageWidthTotal / events.length; 
                            event.width_perc = event.width + "%";                             
                            event.right = pecentageWidthTotal - (event.width * col_inc ) + 5 + "%";
                            col_inc++;
                        }
                    });  
                }

                //Reservations
                function refreshRes() {
                    var realDateNow = getRealDateString($scope.date,$scope.offset);
                    endpoint.res.list(realDateNow).success(function(data) {
                        if (data.items) {
                            for (var i = 0; i < data.items.length; i++) {
                                var event = data.items[i];
                                event.collision_index = -1;
                                var h = document.getElementById($scope.id + "_" + event.start).offsetHeight;
                                var w = document.getElementById($scope.id + "_" + event.start).offsetWidth;
                                event.top = h * (event.start - 2*$scope.min) + 10;
                                event.height = (event.end - event.start) * h;
                                event.width = w;
                                var colors = [];
                                for (var j = 0; j < event.assets.length; j++) {
                                    colors.push('rgba(' + event.assets[j].r + ',' + event.assets[j].g + ',' + event.assets[j].b + ',1.0)');
                                }
                                event.gradient = colors.join(',');
                                if (colors.length == 1) {
                                    event.gradient = event.gradient + ', ' + event.gradient;
                                }
                            }
                        }
                        
                        $scope.events = data.items;                      
                        $scope.events = $filter('orderBy')($scope.events, 'start');
                        
                        var max_collision = 0;
                        var collision_index = 0;
                        //Calculate the collisions betweens the reservations
                        angular.forEach($scope.events, function(event) {                           
                            event.num_collision = 0;                          
                            if(event.collision_index < 0){
                                event.collision_index =  collision_index;
                                collision_index ++;
                            }                          
                            angular.forEach($scope.events, function(eventCompare) {
                                if(collide(event,eventCompare)){
                                    event.num_collision += 1;
                                    eventCompare.collision_index = event.collision_index; 
                                }
                            });                            
                            if(event.num_collision > max_collision){
                                max_collision = event.num_collision;  
                            }                             
                        });
                       
                        //Put the connections components
                        var connectionsComponents = [];
                        angular.forEach($scope.events, function(event) {
                            if(!angular.isDefined(connectionsComponents[event.collision_index])){
                                connectionsComponents[event.collision_index] = [];
                            }
                            connectionsComponents[event.collision_index].push(event);
                        });                       
                        angular.forEach(connectionsComponents, function(comp) {
                            calculate_space(comp);
                        });       
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
