import { LOTTO, CYPRESS_TEST } from "../../src/js/constants/index.js";

before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-lotto", () => {
  beforeEach(() => {
    cy.get(".price").clear();
  });

  context("로또 구입", () => {
    beforeEach(() => {
      cy.get(".price").type(CYPRESS_TEST.TOTAL_PRICE);
      cy.get(".submit").click();
    });

    it("금액 입력 시 구매 갯수 text가 출력된다.", () => {
      cy.get(".total").should(
        "text",
        `총 ${Math.floor(
          CYPRESS_TEST.TOTAL_PRICE / LOTTO.PRICE
        )}개를 구매하였습니다.`
      );
    });

    it("금액 입력 시 구매 갯수 만큼의 lotto가 출력된다.", () => {
      cy.get(".lotto-container div").should(
        "length",
        Math.floor(CYPRESS_TEST.TOTAL_PRICE / LOTTO.PRICE)
      );
    });
  });
});
