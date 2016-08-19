(function(){

    var app = angular.module('githubViewer', []);

    var MainController = function($scope, githubService, $interval, $anchorScroll, $location) {

        var onUserComplete = function(data){
            $scope.user = data;
            githubService.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function(data){
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
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
            githubService.getUser($scope.username).then(onUserComplete, onError);
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

    app.controller('MainController', [
        "$scope", "githubService", "$interval",
        "$anchorScroll", "$location", MainController]);

})();
