(function(){

    var githubService = function($http){

            // .then() returns a promise, so whatever calls getUser
            // will get a promise, they won't get a user.
            var getUser = function(username){
                return $http.get("https://api.github.com/users/" + username)
                            .then(function(response){
                                return response.data;
                            });
            };

            var getRepos = function(user){
                return $http.get(user.repos_url)
                            .then(function(response){
                                return response.data;
                            });
            };

            return {
                getUser: getUser,
                getRepos: getRepos
            };
    };
    var module = angular.module("githubViewer");
    module.factory("githubService", githubService);
}());
