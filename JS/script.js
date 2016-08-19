(function(){

    let app = angular.module('githubViewer', []);

    let MainController = function($scope, githubService, $interval, $anchorScroll, $location) {

        let onUserComplete = (data) => {
            $scope.user = data;
            githubService.getRepos($scope.user).then(onRepos, onError);
        };

        let onRepos = (data) => {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        let onError = (reason) => {
                $scope.error = "Could not fetch the data!";
        };

        let decrementCount = () => {
                $scope.countdown--;
                if ($scope.countdown < 1){
                    $scope.search();
                }
        };

        let countdownInterval = null;
        $scope.startCountdown = () => {
                // Call decrementCount once a second 5 times (countdown is initialised to 5)
                countdownInterval = $interval(decrementCount, 1000, $scope.countdown);
        };

        $scope.search = () => {
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
