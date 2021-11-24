import {
  LOTTO,
  CYPRESS_TEST,
  CONFIRM_MESSAGE,
} from "../../src/js/constants/index.js";

before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-lotto", () => {
  beforeEach(() => {
    cy.get(".price").clear();
  });

  context("로또 자동구매 테스트", () => {
    beforeEach(() => {
      cy.get(".price").type(CYPRESS_TEST.TOTAL_PRICE);
      cy.get(".submit").click();
      cy.on("window:confirm", () => false);
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

    it("당첨 번호를 입력하고 결과 확인하기 버튼을 누르면 모달창이 출력된다.", () => {
      cy.winningNumbers(CYPRESS_TEST.WINNING_NUMBER);
      cy.bonusNumber(CYPRESS_TEST.BONUS_NUMBER);
      cy.get(".open-result-modal-button").click();
      cy.get(".modal").should("be.visible");
    });

    it("X 버튼을 클릭하면 모달 창이 닫힌다.", () => {
      cy.get(".modal-close").click();
      cy.get(".modal").should("not.be.visible");
    });
  });
});
