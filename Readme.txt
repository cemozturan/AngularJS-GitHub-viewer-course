Two requirements:

1) Add a <script> tag pointing to angular.js
2) Add an ng-app attribute in your HTML ( <div ng-app> ... this area is controlled by Angular ... </div> )

-----------------------------

PLUNKER TIPS

plnkr.co

Theme olarak monokai sec, sagda preview windowda, editors seceneginde (sag altta).
preview window'un auto-refresh olmasini iptal edebilirsin. Edersen, preview window icindeki yesil kareye bas, refresh eder. Mavi olan ise yeni bir windowda acar preview'i, daha cok alan gorebilesin diye.
Github hesabi ile login olabilirsin, oraya atarsin isini.
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
Controllers can use services (e.g., $http)

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

"then(successCallback, failureCallback)": then'e verilen ilk parametre basarili bir response gelince execute edilen fonksiyon, ikinci fonksiyon ise eger bir hata olmussa execute edilecek olan fonksiyon.

-- Controllers and Modules --

Controllers usually live in modules, avoids global namespace. It's easy to work with modules:

1) Create a module with a name
 * var app = angular.module("moduleName", []); // array is the list of dependencies
2) Register your controllers in the module
 * app.controller("controllerName", controllerFunction);
3) Tell Angular to use your module with ng-app
 * <div ng-app="moduleName"> ... </div>

-----------------------------

DIRECTIVES and VIEWS

-- Philosophy --

* $scope provides the model
* Model does not touch HTML
* Data binding moves model data to view (<h1>{{ message }}</h1>)
* Bu separation of concerns.
* Directives allow for indirect model view interaction.

-- ng-model --

Creates a two-way binding, keeps the data in sync.

-- Filters --

Basic format: expression|filterName:parameter
Examples:
{{amount | currency:"USD$"}}
{{startDate | date:'short'}}
{{repo | json}} --- Useful for dumping things on the UI and debugging
{{filter | searchTerm}}
repo in repos | limitTo:10
repo in repos | filter:searchTerm | orderBy:'name' --- Ascending by default
repo in repos | filter:searchTerm | orderBy:'-name' --- Descending

-- ng-include --

<div ng-include="'Views/userdetails.html'"> </div>

Guvenlik nedeni ile browser diskteki dosyalara erisime izin vermez (file://path). Butun chrome instancelari kapatip command line'dan "start chrome --allow-file-access-from-files" (quotelar olmadan) yazmak zorunda kaldim. Butun chrome'lari kapatmadan calismadi.

SO'ya gore local bir server kurup nodeJS ile filan sonra oradan file serve etmek gerekiyormus (localhost:8080/path gibi)

-----------------------------

SERVICES

If the logic doesn't fit in a model, view, or a directive, then it should probably be a service.
Tekrar kullanilabilirler.

Iki tane built-in Angular service'i:
$timeout (setTimeout icin wrapper. setTimeout(someFunc, X), X kadar bekler ve verilen fonksiyonu cagirir)
$interval (setInterval icin wrapper. setInterval(someFunc, X), her X'te verilen fonksiyonu cagirir)

Normal JS fonksiyonlari olan setTimeout/setInterval yerine Angular'inkileri kullanmanin iki faydasi:
1) Unit testing cok daha kolay
2) Two-way binding calisir. Normal JS versiyonlarinda ekran update olmaz.

$log service'i debugging icin ise yarar.

$location service'i address bar update icin kullan.

$anchorScroll service'i scroll icin kullan, id'si olan bir elementi kullanarak.

Mesela arama sonuclari div'ine HTML'de id = "results" veririz, sonra su kodu kullanarak o sonuclara scroll edebiliriz:
$location.hash("results");
$anchorScroll();

-- Custom Services --

Why build your own?

1) Create reusable logic, package it in a container.
2) Create shared data. Her service'in sadece bir instance'i var. Farkli controllerlar, viewlar hep ayni service instance'i kullanir, ayni data olur.
3) Manage complexity.

Genelde server'a konusan her seyi, http'leri filan bir service'e koymak lazim, controller/model/view filan direkt yapmamali bu isi.

Controllerlari, modellari filan daha basit tutar, daha testable yapar, kucuk parcalara ayirir, vs..

-----------------------------

ROUTING

Allows users to navigate between different screens
Pass parameters between the controllers that manage these screens
Tap into browser's back/forward buttons so the browser history is synced with user's location within the app.

* Routing is based on URL (/users/cemkebabson)
* Routing engine captures the request
* Routing rules render a response

-- Routing with Angular --
* Depends on another module: angular-route.js
* Configure rules into $routeProvider
$routeProvider
	.when("/main", {
		templateUrl: "main.html",
		controller: "MainCtrl"
	});
* Setup a layout view (app'in butun sayfalarinda gorunen view layout view. Mesela headerlar footerlar filan.)

UPDATE (Angular Application Development: ngRoute is fine for simple routing but ui-router is exponentially stronger. It actually turns your app into a state machine. ngRoute can be used once across the app and doesn't allow nested views. With ui-router, you can update a portion of the page instead of re-drawing the whole page.)