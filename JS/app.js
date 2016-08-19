(function(){

    // ngRoute is needed to use $routeProvider
    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "Views/main.html",
                controller: "MainController"
            })
            .when("/user/:username", { // ':username' means 'username' is a parameter. Everything else is literal strings
                templateUrl: "Views/userdetails.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "Views/repo.html",
                controller: "RepoController"
            })
            .otherwise({redirectTo: "/main"});
    });
}());
