describe("test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500/");
    });

    it("5+7=12", () => {
        cy.get("[data-test=purchase-price-input]").invoke("val", 200);

        //cy.get("[data-test=total]").contains(12);
    });
});
