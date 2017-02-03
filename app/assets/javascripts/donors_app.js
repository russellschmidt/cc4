var app = angular.module(
	'donors', 
	[
		'ngRoute',
		'ngResource',
		'templates'
	]
);

app.config(["$routeProvider", "$locationProvider",
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		// routes go here

		$routeProvider.when('/', {
				templateUrl: 'donor_search.html',
				controller: 'DonorSearchController',
			}).when('/:id', {
				templateUrl: 'donor_detail.html',
				controller: 'DonorDetailController'
			}).otherwise({
				redirectTo: function(current, path, search) {
					if(search.goto) {
						return '/' + search.goto;
					}
					return '/'
				}
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

		$scope.viewDetails = function(donor) {
			$location.path("/" + donor.id);
		}
	}
]);

app.controller("DonorDetailController", [
			"$scope", "$routeParams", "$resource",
	function($scope, $routeParams, $resource) {
		$scope.donorId = $routeParams.id;
		var Donor = $resource('/donors/:donorId.json')
		$scope.donor = Donor.get({ "donorId": $scope.donorId })

		// Make the Ajax call and set $scope.donor
		// var donorId = $routeParams.id;
		// $scope.donor = {};

		// $http.get(
		// 	"/donors/" + donorId + ".json"
		// 	).then(function(response) {
		// 		$scope.donor = response.data;
		// 	}, function(response) {
		// 		alert("There was a problem: " + response.status);
		// 	}
		// );
	}
]);

app.controller("DonorCreditCardController", [
			"$scope", "$resource",
	function($scope, $resource) {
		var CreditCardInfo = $resource('/fake_billing.json')
		$scope.setCardholderId = function(cardholderId) {
			$scope.creditCard = CreditCardInfo.get(
				{ "cardholder_id": cardholderId })	
		}
		
	}
]);

