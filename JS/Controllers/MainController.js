(function(){

    let app = angular.module('githubViewer');

    let MainController = function($scope, $interval, $location) {

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

        $scope.search = function() {
            if (countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + $scope.username)
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        $scope.startCountdown();
    };

    app.controller('MainController', [
        "$scope", "$interval",
        "$location", MainController]);

})();
