import {
  clickButtonWithSelector,
  typePriceInput,
  typeWinningNumbers,
} from "../cypress-util.js";
import { ALERT_STRING } from "../../../src/js/constants.js";

context("STEP 2", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
    typePriceInput("5000");
  });

  context("당첨번호 입력에 관한 테스트", () => {
    it("당첨번호를 입력하지 않고 결과 확인하기 버튼을 누를 경우 번호를 입력하라는 얼럿이 띄워진다. ", () => {
      clickButtonWithSelector(".open-result-modal-button");
      cy.on("window:alert", (text) => {
        expect(text).to.contains(ALERT_STRING.EMPTY_WINNING_NUMBER_INPUT);
      });
    });

    it("당첨 번호 입력 후 결과 확인하기 버튼을 누르면 당첨 통계와 관련된 모달창이 띄워진다. ", function () {
      typeWinningNumbers();
      cy.get("#statistics").should("be.visible");
    });
  });

  context("당첨 통계 모달 버튼 클릭에 관한 테스트", () => {
    it("닫기 버튼을 누르면 모달창이 사라진다. ", () => {
      typeWinningNumbers();
      clickButtonWithSelector(".modal-close");
      cy.get("#statistics").should("not.be.visible");
    });

    it("다시 시작하기 버튼을 누를 경우 모든 화면이 초기화된다. ", () => {
      typeWinningNumbers();
      clickButtonWithSelector("#restart-button");

      cy.get("#price-input-form > div > input").should("have.text", "");

      cy.get("#purchase-detail").should("not.be.visible");
      cy.get("#winning-number-input").should("not.be.visible");
      cy.get("#statistics").should("not.be.visible");
    });
  });
});
