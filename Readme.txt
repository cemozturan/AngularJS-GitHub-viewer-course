Two requirements:

1) Add a <script> tag pointing to angular.js
2) Add an ng-app attribute in your HTML ( <div ng-app> ... this area is controlled by Angular ... </div> )

-----------------------------

PLUNKER TIPS

plnkr.co

Theme olarak monokai sec, sagda preview windowda, editors seceneginde (sag altta).
preview window'un auto-refresh olmasini iptal edebilirsin. Edersen, preview window icindeki yesil kareye bas, refresh eder. Mavi olan ise yeni bir windowda acar preview'i, daha cok alan gorebilesin diye.
Github' hesabi ile login olabilirsin, oraya atarsin isini.
zip olarak download edebilirsin isini.
Ustte bir tick var, beautify eder kodu, indentation filan duzelir hep.

-----------------------------

CONTROLLERS

-- Basics --

 * ng-controller directive in HTML (<div ng-controller="mainController">)
 * Controllers are functions that Angular invokes
	var mainController = function($scope){
		$scope.message = "Hello!";
	};
 * Controller takes a $scope parameter
 * $scope is not a model but things we attach to it are the model.
 * Su sekilde bir app yaratip controller'i declare ederiz:
	(function(){
    
		var app = angular.module('githubViewer', []);

		    var MainController = function($scope) {

		        $scope.message = "Hello, Angular!";

		    };

		app.controller('MainController', ["$scope", MainController]); // Su arrayin gerekli olma sebebi minification. En son parametre controller fonksiyonu olmali.

	})();

-- Controller Capabilities --

Never manipulates the HTML (i.e., view) directly. Manipulates the model (things we attach to $scope). Separation of concerns.
There are often multiple controllers even on a single page, each is responsible for a different feature. Can even be nested.

-- Calling HTTP --

$http Service
Encapsulates HTTP communication (GET, POST, PUT, DELETE)

Needs to be asked to be provided, pass in as a parameter to controller function. We can't just ask for it inside a controller.
The following code has a serious flaw. $http communication method never returns the data immediately because all communication is asynchronous.
* var someController = function($scope, $http) {
	$scope.user = $http.get("/users/1234");
}
Http method returns a promise, which will be resolved in future.
* var someController = function($scope, $http) {
	var promise = $http.get("/users/1234");
	promise.then(function(response){
		$scope.user = response.data; // response is the Http response, has a bunch of things like status etc., but we are mostly interested in data.
	});
};

Simplified:
* var someController = function($scope, $http) {
	$http.get("/users/1234");
		.then(function(response){
			$scope.user = response.data;
	});
};