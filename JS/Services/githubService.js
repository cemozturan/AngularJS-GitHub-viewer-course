(function(){

    let githubService = function($http){

            // .then() returns a promise, so whatever calls getUser
            // will get a promise, they won't get a user.
            let getUser = (username) => {
                return $http.get("https://api.github.com/users/" + username)
                            .then((response) => {
                                return response.data;
                            });
            };

            let getRepos = (user) => {
                return $http.get(user.repos_url)
                            .then((response) => {
                                return response.data;
                            });
            };

            return {
                getUser: getUser,
                getRepos: getRepos
            };
    };
    let module = angular.module("githubViewer");
    module.factory("githubService", githubService);
}());
