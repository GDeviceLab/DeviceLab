calApp.filter('reservations', function() {
    return function(reservations, search) {
        var out = new Array();
        if (reservations) {
            for (var i = 0; i < reservations.length; i++) {
                var person = true;
                var assets = true;
                if (search.person) {
                    if (search.person != reservations[i].person) {
                        person = false;
                    }
                }
                if (search.assets && search.assets.length > 0) {
                    assets = false;
                    for (var j = 0; j < reservations[i].assets.length; j++) {
                        for (var k = 0; k < search.assets.length; k++) {
                            if (reservations[i].assets[j].id == search.assets[k]) {
                                assets = true;
                            }
                        }
                    }
                }
                if (person && assets) {
                    out.push(reservations[i]);
                }
            }
        }
        return out;
    };
});
calApp.filter('hours', function() {
    return function(input){
        if(input/2 == Math.floor(input/2)){
            return (input/2) + "h";
        } else {
            return Math.floor(input/2) + "h30";
        }
    };
});

calApp.filter('localize', function() {
    return function(input){
        var hours = input.split(":")[0];
        var minutes = input.split(":")[1];
        var d = new Date(2015, 0, 21, hours, minutes);
        var options = { hour:'numeric', minute: 'numeric'};
        return d.toLocaleTimeString(window.navigator.language,options);
    };
});

calApp.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});