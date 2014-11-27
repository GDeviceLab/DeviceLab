calApp.directive('newsFeed', function() {
    return {
        templateUrl: '/directives/newsfeed/newsfeed.html',
        restrict: 'EA',
        scope: {
            limit: "@",
            rank: "@",
            pClass: "@"
        },
        controller: function($scope, endpoint) {
            endpoint.then(function(endpoint) {
                endpoint.news.active().success(function(data) {
                    //GitHub #20
                    try{
                        $scope.news = [];
                        if(data !== null
                                && data.items !== null
                                && data.items.length > 0){
                            var newsMap = {
                                localList:[],
                                globalList:[]
                            };
                            for (var i = 0; i < data.items.length; i++) {
                                var newsObj = data.items[i];
                                if(newsObj.broadcast){
                                    newsMap.globalList.push(newsObj);
                                }
                                else{
                                    newsMap.localList.push(newsObj);
                                }
                            }
                            if(newsMap.localList.length > 0){
                                $scope.news.push(newsMap.localList[0]);
                                newsMap.localList.splice(0,1);
                            }
                            if(newsMap.globalList.length > 0){
                                $scope.news.push(newsMap.globalList[0]);
                                newsMap.globalList.splice(0,1);
                            }
                            $scope.news = $scope.news.concat(newsMap.localList);
                            $scope.news = $scope.news.concat(newsMap.globalList);
                        }
                    }
                    catch(e){
                        console.log(e.message);
                        $scope.news = data.items;
                    }
                });
            });
            
            $scope.reduceText = function(value,limit){
                if(!isNaN(limit)
                    && limit > 0
                    && value != null
                    && value.length > limit){
                    var newString = value.substring(0,limit);
                    return newString+ "...";
                }
                console.log("limit value is empty");
                return value;
            }
        }
    }
})