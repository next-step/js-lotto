//import {MESSAGE} from "./src/js/constant/index.js";

describe("test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500/");
    });

    it("구입 금액을 1000단위로 입력하지 않았을때 alert", () => {
        cy.get("[data-test=purchase-price-input]").type(1100);
        cy.get("[data-test=purchase-button]").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains("금액은 1000단위로 입력해야 합니다.");
        })
    });
});
