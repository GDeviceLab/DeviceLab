calApp.factory('endpoint', ['$http', '$rootScope', '$window', '$q', function($http, $scope, $window, $q) {
        var response = $q.defer();

        var service = {};
        var location = -1;
        var user = {};
        var token;
        var origin;
        var loading = 0;
        var redirect = false;
        var show = false;
        var local = "";

        ///////////////
        // CALLBACKS //
        ///////////////

        function error(response, status) {
            loading--;
            console.log(response.message);
            if (redirect) {
                if (status == 401) {
                    $window.location.href = "#/unauthorized";
                }
            }
        }

        function success(response, status) {
            loading--;
        }

        ////////////
        //  AUTH  //
        ////////////

        function fetchToken() {
            return $http.get("/auth")
                    .success(function(data) {
                        if (data.redirect) {
                            $window.location.href = data.redirect;
                        } else {
                            token = data.hash;
                            origin = data.user;
                        }
                    });
        }

        function url(api, path, params) {
            params.token = token;
            params.origin = origin;
            var frags = [];
            Object.keys(params).forEach(function(key) {
                frags.push(key + "=" + encodeURI(params[key]));
            });

            return "/_ah/api/" + api + "/v1/" + path + "?" + (frags.join("&"));
        }


        ////////////////
        //   PERSON   //
        ////////////////
        service.person = {};
        service.person.get = function(mail) {
            loading++;
            return $http.get(url("person", "get", {mail: mail}))
                    .success(success).error(error);
        };
        service.person.favorite = function(loc) {
            loading++;
            return $http.get(url("person", "favorite", {location: loc}))
                    .success(success).error(error);
        };
        service.person.listActives = function(loc) {
            loading++;
            return $http.get(url("person", "list/actives", {location: loc}))
                    .success(success).error(error);
        };
        service.person.listPending = function(loc) {
            loading++;
            return $http.get(url("person", "list/pending", {location: loc}))
                    .success(success).error(error);
        };
        service.person.listAdmins = function(loc) {
            loading++;
            return $http.get(url("person", "list/admins", {location: loc}))
                    .success(success).error(error);
        };
        /////////////////
        //     ACL     //
        /////////////////
        service.person.register = function(pseudo,startupName) {
            loading++;
            redirect = true; //redirect was false is the user wasn't registered, now it's true
            return $http.get(url("person", "register", {username: pseudo, startupName:startupName}))
                    .success(success).error(error).success(function() {
                user.name = pseudo;
                user.mail = origin;
                user.startupName = startupName;
            });
        };
        service.person.promote = function(usr, loc) {
            loading++;
            return $http.get(url("person", "promote", {location: loc, user: usr}))
                    .success(success).error(error);
        };
        service.person.demote = function(usr, loc) {
            loading++;
            return $http.get(url("person", "demote", {location: loc, user: usr}))
                    .success(success).error(error);
        };
        service.person.apply = function(loc) {
            loading++;
            return $http.get(url("person", "postulate", {location: loc}))
                    .success(success).error(error);
        };
        service.person.grantLocal = function(usr, loc) {
            loading++;
            return $http.get(url("person", "grant/local", {location: loc, user: usr}))
                    .success(success).error(error);
        };
        service.person.grantGlobal = function(usr) {
            loading++;
            return $http.get(url("person", "grant/global", {user: usr}))
                    .success(success).error(function() {
                loading--;
            });
        };
        service.person.status = function() {
            loading++;
            return $http.get(url("person", "status", {}))
                    .success(success).error(error);
        };
        //////////////////
        // RESERVATIONS //
        //////////////////
        service.res = {};
        service.res.get = function(id) {
            loading++;
            return $http.get(url("reservation", "get", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.res.list = function(date) {
            loading++;
            return $http.get(url("reservation", "list", {location: location, date: new Date(date).toJSON()}))
                    .success(success).error(error);
        };
        service.res.put = function(reservation) {
            loading++;
            return $http.post(url("reservation", "put", {location: location}), reservation)
                    .success(success).error(error);
        };
        service.res.delete = function(id) {
            loading++;
            return $http.get(url("reservation", "delete", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.res.history = function(user) {
            loading++;
            return $http.get(url("reservation", "history", {location: location, user: user}))
                    .success(success).error(error);
        };
        //////////////////
        //    ASSETS    //
        //////////////////
        service.asset = {};
        service.asset.get = function(id) {
            loading++;
            return $http.get(url("asset", "get", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.asset.list = function() {
            loading++;
            return $http.get(url("asset", "list", {location: location}))
                    .success(success).error(error);
        };
        service.asset.put = function(asset) {
            loading++;
            return $http.post(url("asset", "put", {location: location}), asset)
                    .success(success).error(error);
        };
        service.asset.delete = function(id) {
            loading++;
            return $http.get(url("asset", "delete", {location: location, id: id}))
                    .success(success).error(error);
        };
        //////////////////
        //   LOCATION   //
        //////////////////
        service.location = {};
        service.location.list = function() {
            loading++;
            return $http.get(url("location", "list", {}))
                    .success(success).error(error).success(function(data) {
                locations = data;
            });
        };
        service.location.listActives = function() {
            loading++;
            return $http.get(url("location", "list/actives", {}))
                    .success(success).error(error);
        };
        service.location.put = function(locat) {
            loading++;
            return $http.post(url("location", "put", {}), locat)
                    .success(success).error(error);
        };
        service.location.get = function(id) {
            loading++;
            return $http.get(url("location", "get", {id: id}))
                    .success(success).error(error);
        };
        //////////////
        //   NEWS   //
        //////////////
        service.news = {};
        service.news.put = function(news) {
            loading++;
            return $http.post(url("news", "put", {location: location}), news)
                    .success(success).error(error);
        };
        service.news.get = function(id) {
            loading++;
            return $http.get(url("news", "get", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.news.fetch = function(rank, count) {
            loading++;
            return $http.get(url("news", "fetch", {location: location, rank: rank, count: count}))
                    .success(success).error(error);
        };
        service.news.read = function() {
            //loading++; //No point displaying a loading screen in that case
            return $http.get(url("news", "read", {location: location}));
            //.success(success).error(error);
        };
        service.news.latest = function() {
            //loading++; //No point displaying a loading screen in that case
            return $http.get(url("news", "latest", {location: location}));
            //.success(success).error(error);
        };
        service.news.delete = function(id) {
            loading++;
            return $http.get(url("news", "delete", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.news.active = function() {
            loading++;
            return $http.get(url("news", "active", {location: location}))
                    .success(success).error(error);
        };
        //////////////
        //  STATS   //
        //////////////
        service.stats = {};
        service.stats.devices = function() {
            loading++;
            return $http.get(url("stats", "devices", {location: location}))
                    .success(success).error(error);
        };
        service.stats.device = function(id) {
            loading++;
            return $http.get(url("stats", "device", {location: location, id: id}))
                    .success(success).error(error);
        };
        service.stats.person = function(id) {
            loading++;
            return $http.get(url("stats", "person", {location: location, id: id}))
                    .success(success).error(error);
        };

        //////////////
        // COMMONS  //
        //////////////
        service.callMe = function() {
            return $http.get(url("person", "me", {}))
                    .success(function(data) {
                        user = data;
                        redirect = true;
                        if (location == -1) {
                            if (data.favorite) {
                                service.favorite = data.favorite;
                                location = data.favorite;
                            }
                        }
                    });
        };

        service.loc = function() {
            return location;
        };

        service.show = function() {
            return show;
        };

        service.setLoc = function(newLocation) {
            location = newLocation;
        };

        service.me = function() {
            return user;
        };

        service.origin = function() {
            return origin;
        };


        service.loading = function() {
            return loading > 0;
        };

        // PRIVILEGES

        $scope.$watch(function() {
            return location;
        }, function() {
            local = "";
            if (location && location !== -1) {
                $http.get(url("location", "acl", {location: location})).success(function(data) {
                    local = data.status;
                });
            }
        });

        service.global = function() {
            return user.globalAdmin;
        };

        service.local = function() {
            return service.global() || local === "ADMIN";
        };

        service.owner = function(mail) {
            return !mail || service.local() || mail === origin;
        };

        fetchToken().success(function() {
            service.callMe().success(function() {
                response.resolve(service);
            }).error(function() {
                show = true;
                response.resolve(service);
            });
        });

        return response.promise;
    }]);