import { PRICE_PER_TICKET } from "../../../src/js/constants";

describe("Purchasing Lotto", () => {
    beforeEach(() => {
        cy.visit("localhost:8080");
    });

    it("should return the lotto after submitting the total spending of lotto purchase", () => {
        // given
        const amount = 2000;
        const count = amount / PRICE_PER_TICKET;

        // when
        cy.getBySel("amount-input").type(amount);
        cy.getBySel("amount-form").submit();
        cy.getBySel("number-detail-switch").click();

        // then
        cy.getBySel("tickets-count").should("include.text", count);
        cy.getBySel("lotto-number").should("have.length", count);
    });

    it("should alert warning when the user does not type the prices of purchasing in 1000 won unit", () => {
        // Alert 테스트 예제 https://365kim.tistory.com/74
        const stub = cy.stub();
        cy.on("window:alert", stub);

        const amount = 2500;

        cy.getBySel("amount-input").type(amount);
        cy.getBySel("amount-form")
            .submit()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                    "각각의 로또는 1,000원 단위로 구매하실 수 있습니다."
                );
            });
    });

    it("should be able to be displayed with lottoNumbers when clicking a toggleButton", () => {
        // given
        const amount = 2000;
        cy.getBySel("amount-input").type(amount);
        cy.getBySel("amount-form").submit();
        cy.getBySel("lotto-number-detail").should("not.exist");

        // when
        cy.getBySel("number-detail-switch").click();

        // then
        cy.getBySel("lotto-number-detail").then(($el) => {
            expect(Cypress.dom.isVisible($el)).true;
        });

        // when
        cy.getBySel("number-detail-switch").click();

        // then
        cy.getBySel("lotto-number-detail").then(($el) => {
            expect(Cypress.dom.isVisible($el)).false;
        });
    });
});