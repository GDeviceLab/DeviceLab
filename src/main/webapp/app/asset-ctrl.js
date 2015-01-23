calApp.controller("ListAssetCtrl", function($scope, endpoint, $window) {
    function refresh() {
        endpoint.asset.list().success(function(data) {
            $scope.assets = data.items;
        });
    }
    refresh();
    
    $scope.delete = function(id) {
        endpoint.asset.delete(id).success(refresh);
    };
    
    $scope.goTo = function(value){
        $window.location.hash = value;
    };
});
calApp.controller("NewAssetCtrl", function($scope, endpoint, $window) {
    
      $scope.initpalettecolors = function() {
        var container = $('.colors-palette');
        var colors = [[5,40,58],[4,16,75],[13,2,45],[34,0,47],[48,2,20],[75,0,2],[70,20,1],[70,39,3],[67,47,3],[82,80,4],[62,71,6],[31,51,12],[11,89,123],[6,44,154],[32,4,99],[75,1,103],[100,14,48],[165,6,6],[154,44,5],[150,84,5],[148,106,6],[183,177,8],[135,153,14],[63,104,29],[18,145,207],[7,67,254],[57,0,164],[129,1,171],[168,24,75],[252,39,17],[251,83,8],[253,154,9],[250,189,9],[255,255,50],[209,234,42],[101,178,51],[71,204,252],[98,148,254],[113,42,253],[197,50,254],[231,87,142],[253,116,111],[252,147,104],[254,186,98],[253,209,98],[253,251,131],[229,242,125],[162,216,122],[191,238,255],[201,219,255],[206,187,255],[237,185,253],[246,201,219],[252,208,204],[254,218,205],[254,232,202],[255,239,202],[253,254,211],[248,250,211],[216,234,201],[255,255,255],[255,255,255],[255,255,255],[239,239,239],[208,208,208],[176,176,176],[149,149,149],[108,108,108],[70,70,70],[49,49,49],[29,29,29],[0,0,0]];
        $.each(colors, function() {
          var r = this[0];
          var g = this[1];
          var b = this[2];
          var elem = $('<div class="color-single-box">');
          elem.css('background', 'rgb(' + r + ',' + g + ',' + b + ')');
          elem.appendTo(container);

          elem.click(function() {
              var rgb = elem.css('background').match(/\d+/g);
              $scope.rgb = {};
              $scope.rgb.r = rgb[0];
              $scope.rgb.g = rgb[1];
              $scope.rgb.b = rgb[2];
              $scope.$apply();
          });
        });
    };   
   
    $scope.a = {};
    $scope.submit = function() {
        if(!$scope.rgb){
            $scope.error = "ERROR_ASSET_COLOR";
            return;
        }
        if(!$scope.a.name){
            $scope.error = "ERROR_ASSET_NAME";
            return;
        }
         if(!$scope.a.os){
            $scope.error = "ERROR_ASSET_OS";
            return;
        }
        $scope.a.r = $scope.rgb.r;
        $scope.a.g = $scope.rgb.g;
        $scope.a.b = $scope.rgb.b;
        endpoint.asset.put($scope.a).success(function() {
            window.location.href = "#/devices/list";
        });
    };
    
    $scope.goTo = function(){
        $window.history.back();
    };
});
calApp.controller("EditAssetCtrl", function($scope, $stateParams, endpoint, $window) {
    
    $scope.initpalettecolors = function() {
        var container = $('.colors-palette');
        var colors = [[5,40,58],[4,16,75],[13,2,45],[34,0,47],[48,2,20],[75,0,2],[70,20,1],[70,39,3],[67,47,3],[82,80,4],[62,71,6],[31,51,12],[11,89,123],[6,44,154],[32,4,99],[75,1,103],[100,14,48],[165,6,6],[154,44,5],[150,84,5],[148,106,6],[183,177,8],[135,153,14],[63,104,29],[18,145,207],[7,67,254],[57,0,164],[129,1,171],[168,24,75],[252,39,17],[251,83,8],[253,154,9],[250,189,9],[255,255,50],[209,234,42],[101,178,51],[71,204,252],[98,148,254],[113,42,253],[197,50,254],[231,87,142],[253,116,111],[252,147,104],[254,186,98],[253,209,98],[253,251,131],[229,242,125],[162,216,122],[191,238,255],[201,219,255],[206,187,255],[237,185,253],[246,201,219],[252,208,204],[254,218,205],[254,232,202],[255,239,202],[253,254,211],[248,250,211],[216,234,201],[255,255,255],[255,255,255],[255,255,255],[239,239,239],[208,208,208],[176,176,176],[149,149,149],[108,108,108],[70,70,70],[49,49,49],[29,29,29],[0,0,0]];
        $.each(colors, function() {
          var r = this[0];
          var g = this[1];
          var b = this[2];
          var elem = $('<div class="color-single-box">');
          elem.css('background', 'rgb(' + r + ',' + g + ',' + b + ')');
          elem.appendTo(container);

          elem.click(function() {
              var rgb = elem.css('background').match(/\d+/g);
              $scope.rgb = {};
              $scope.rgb.r = rgb[0];
              $scope.rgb.g = rgb[1];
              $scope.rgb.b = rgb[2];
              $scope.$apply();
          });
        });
    }; 
    
    $scope.a = {};
    $scope.submit = function() {
        $scope.a.r = $scope.rgb.r;
        $scope.a.g = $scope.rgb.g;
        $scope.a.b = $scope.rgb.b;
        endpoint.asset.put($scope.a).success(function() {
            window.location.href = "#/devices/list";
        });
    };

    endpoint.asset.get($stateParams.id).success(function(data) {
        $scope.a = data;
        $scope.rgb = {r: data.r, g: data.g, b: data.b}
    });
    
    $scope.goTo = function(){
        $window.history.back();
    };
});