(function(){

    let app = angular.module('githubViewer');

    let UserController = function($scope, githubService, $routeParams) {
      // $routeParams will give us the parameters that is defined in the URL.
      // These become available as properties on $routeParams (e.g., $routeParams.username)

        let onUserComplete = (data) => {
            $scope.user = data;
            githubService.getRepos($scope.user).then(onRepos, onError);
        };

        let onRepos = (data) => {
            $scope.repos = data;
        };

        let onError = (reason) => {
                $scope.error = "Could not fetch the data!";
        };

        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = $routeParams.username;
        githubService.getUser($scope.username).then(onUserComplete, onError);
    };

    app.controller('UserController', [
        "$scope", "githubService", "$routeParams", UserController]);

})();
