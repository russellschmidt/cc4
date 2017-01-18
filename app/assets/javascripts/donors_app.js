var app = angular.module(
	'donors', 
	[
		'ngRoute'
	]
	);

app.controller("DonorSearchController", [
	"$scope", "$http",
	function($scope, $http) {
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
	}
]);

