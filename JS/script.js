(function(){

    var app = angular.module('githubViewer', []);

    var MainController = function($scope, $http, $interval) {

        var onUserComplete = function(response){
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response){
            $scope.repos = response.data;
        };

        var onError = function(reason){
                $scope.error = "Could not fetch the data!";
        };

        var decrementCount = function(){
                $scope.countdown--;
                if ($scope.countdown < 1){
                    $scope.search();
                }
        };

        var countdownInterval = null;
        $scope.startCountdown = function(){
                // Call decrementCount once a second 5 times (countdown is initialised to 5)
                countdownInterval = $interval(decrementCount, 1000, $scope.countdown);
        };

        $scope.search = function(){
            $http.get("https://api.github.com/users/" + $scope.username)
                .then(onUserComplete, onError);
            if (countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.countdown = 5;
        $scope.startCountdown();
    };

    app.controller('MainController', ["$scope", "$http", "$interval", MainController]);

})();
