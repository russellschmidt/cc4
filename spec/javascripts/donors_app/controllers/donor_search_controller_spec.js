describe("DonorSearchController", function() {
	describe("Initialization", function() {
		var scope = null, 
				controller = null;

		beforeEach(module("donors"));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			controller = $controller("DonorSearchController", {
				$scope: scope
			});
		}));

		// tests go here... 
		it("defaults to an empty customer list", function() {
			expect(scope.donors).toEqualData([]);
		});
	});


	describe("Fetching Search Results", function(){
		var scope = null,
				controller = null,
				httpBackend = null,
				serverResults = [
					{
						id: 123,
						first_name: "Bob",
						last_name: "Jones",
						email: "bjones@foo.net",
						username: "jonesy"
					},{
						id: 456,
						first_name: "Bob",
						last_name: "Johnsons",
						email: "johnboy@bar.info",
						username: 'bobbyj'
					}
				];

		beforeEach(module("donors"));

		beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			controller = $controller("DonorSearchController", {
				$scope: scope
			});
		}));

		beforeEach(function(){
			httpBackend.when('GET', '/donors.json?keywords=bob&page=0').respond(serverResults);
		});

		// Tests go here...
		it("populates the donor list with the results", function(){
			scope.search("bob");
			httpBackend.flush();
			expect(scope.donors).toEqualData(serverResults);
		});
	});
});