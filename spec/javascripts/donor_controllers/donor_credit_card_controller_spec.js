describe("DonorCreditCardController", function(){
  descirbe("Initialization", function() {
    var scope =         null,
        cardholder_id = 42,
        controller =    null,
        httpBackend =   null,
        cardInfo =      { lastFour: '4321',
                          cardType: 'visa',
                          expirationMonth: 3,
                          expirationYear:  2018,
                          detailsLink: 'http://biling.example.com/foo'
                        };

    beforeEach(module("customers"));

    beforeEach(inject(function ($controller, 
                                $rootScope,
                                $httpBackend) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;

      httpBackend.when("GET",
          '/fake_billing.json?cardholder_id=' + cardholderId).
          respond(cardInfo);

      controller = $controller("DonorCreditCardController", {
        $scope: scope
      });
    }));

    // tests inserted here
    // assert nothing happens when controller is initialized
    it("does not hit the backend initially", function() {
      expect(scope.creditCard).not.toBeDefined();
    });

    // test the behavior of the controller
    it("when setCardHolderId is called, hits the back-end", function(){
      scope.setCardHolderId(cardholderId);
      expect(scope.creditCard).toBeDefined();
      expect(scope.creditCard.lastFour).not.toBeDefined();
      httpBackend.flush();
      expect(scope.creditCard).toEqualData(cardInfo);
    })

  });
});