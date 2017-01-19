var app = angular.module(
	'donors', 
	[
		'ngRoute',
		'templates'
	]
);

app.config([
	"$routeProvider",
	function($routeProvider) {
		// routes go here

		$routeProvider.when('/', {
			templateUrl: 'donor_search.html',
			controller: 'DonorSearchController',
		}).when('/:id', {
			templateUrl: 'donor_detail.html',
			controller: 'DonorDetailController'
		});

	}
]);


app.controller("DonorSearchController", [
	"$scope", "$http", "$location",
	function($scope, $http, $location) {
		$scope.donors = [];
		var page = 0;

		$scope.search = function(searchTerm) {
			if (searchTerm.length < 3) {
				return;
			}
			$http.get("/donors.json",
				{ "params": { "keywords": searchTerm, "page": page } }
			).then(function(response) {
				$scope.donors = response.data;
			}, function(response) {
				alert("There was a problem:" + response.status);
			})
		}

		$scope.previousPage = function() {
			if (page > 0) {
				page = page - 1;
				$scope.search($scope.keywords);
			}
		}

		$scope.nextPage = function() {	
			page = page + 1;
			$scope.search($scope.keywords);
		}

		$scope.viewDetails = function() {
			$location.path("/" + donor.id);
		}
	}
]);

app.controller("DonorDetailController", 
	[
	"$scope", "$http", "$routeParams",
	function($scope, $http, $routeParams) {
		// Make the Ajax call and set $scope.donor
		var donorId = $routeParams.id;
		$scope.donor = {};

		$http.get(
			"/donors/" + donorId + ".json"
			).then(function(response) {
				$scope.donor = response.data;
			}, function(response) {
				alert("There was a problem: " + response.status);
			}
		);
	}
]);

