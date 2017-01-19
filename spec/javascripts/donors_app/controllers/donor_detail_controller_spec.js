describe("DonorDetailController", function() {
	describe("Initialization", function() {
		var scope = null,
				controller = null,
				id = 42,
				httpBackend = null,
				donor = {
					id: id,
					first_name: "Bob",
					last_name: "Jones",
					username: "bob.jones",
					email: "bobbyj@somewhere.net",
					created_at: "2014-01-03T11:12:34"
				};

		beforeEach(module("donors"));

		beforeEach(inject(function($controller, 
				$rootScope, 
				$routeParams, 
				$httpBackend) {

			scope = $rootScope.$new();
			httpBackend = $httpBackend;

			$routeParams.id = id;

			httpBackend.when('GET', '/donors/' + id + '.json').respond(donor);

			controller = $controller("DonorDetailController", {
				$scope: scope
			});
		}));

		// tests go below
		it("fetches the donor from the backend", function() {
			httpBackend.flush();
			expect(scope.donor).toEqualData(donor);
		});
		
	});
});