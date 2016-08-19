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

            let getRepoDetails = (username, reponame) => {
                let repo;
                let repoUrl = "https://api.github.com/repos/"
                    + username + "/" + reponame;

                return $http.get(repoUrl)
                            .then(function(response){
                                repo = response.data;
                                return $http.get(repoUrl + "/contributors");
                            })
                            .then(function(response){
                                repo.contributors = response.data;
                                return repo;
                            });
            };

            return {
                getUser: getUser,
                getRepos: getRepos,
                getRepoDetails: getRepoDetails
            };
    };
    let module = angular.module("githubViewer");
    module.factory("githubService", githubService);
}());
