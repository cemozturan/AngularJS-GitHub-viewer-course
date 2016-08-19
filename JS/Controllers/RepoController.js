(function(){

  var app = angular.module("githubViewer");

  var RepoController = function($scope, $routeParams, githubService){

      var onRepo = function(data){
        $scope.repo = data;
      };

      var onError = function(reason){
        $scope.error = reason;
      };

      var reponame = $routeParams.reponame;
      var username = $routeParams.username;

      githubService.getRepoDetails(username, reponame)
        .then(onRepo, onError);
  };

  app.controller("RepoController", [
    "$scope", "$routeParams",
    "githubService", RepoController]);
}());
