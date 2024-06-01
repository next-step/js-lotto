import "cypress-real-events/support";
import LottoRanking from "../../src/js/domain/LottoRanking";

const selectors = {
  PURCHASE_AMOUNT_INPUT: ".purchase-amount-input",
  WINNING_LOTTO_FORM: ".winning-lotto-form",
  WINNING_NUMBER_INPUTS: ".winning-number",
  BONUS_NUMBER_INPUT: ".bonus-number",
  OPEN_RESULT_MODAL_BUTTON: ".open-result-modal-button",
  MODAL: ".modal",
  CLOSE_BUTTON: ".modal-close",
  RESULT_TABLE: ".result-table",
  WINNING_COUNT: ".winning-count",
  PROFIT_RATE: "#profit-rate",
};

const PURCHASE_AMOUNT = 3000;

describe("로또 결과 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

    // 구매 금액 입력
    cy.get(selectors.PURCHASE_AMOUNT_INPUT).type(PURCHASE_AMOUNT);
    cy.get(selectors.PURCHASE_AMOUNT_INPUT).type("{enter}");

    // 당첨 번호 입력
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    cy.get(selectors.WINNING_NUMBER_INPUTS).each(
      (winningNumberInput, index) => {
        cy.wrap(winningNumberInput).type(winningNumbers[index]);
      }
    );
    cy.get(selectors.BONUS_NUMBER_INPUT).type(bonusNumber);

    // 결과 확인 버튼 클릭
    cy.get(selectors.OPEN_RESULT_MODAL_BUTTON).click();
  });

  it("로또 결과 모달은 닫기 버튼, 로또 당첨 결과 표, 수익률로 이루어져 있다.", () => {
    cy.get(selectors.CLOSE_BUTTON).should("be.visible");
    cy.get(selectors.RESULT_TABLE).should("be.visible");
    cy.get(selectors.WINNING_COUNT).should("be.visible");
    cy.get(selectors.WINNING_COUNT).should(
      "have.length",
      Object.keys(LottoRanking.LottoPrize).length
    );
    cy.get(selectors.PROFIT_RATE).should("be.visible");
  });

  it("로또 닫기 버튼을 클릭하면 모달이 닫힌다.", () => {
    cy.get(selectors.CLOSE_BUTTON).click();
    cy.get(selectors.MODAL).should("not.be.visible");
  });

  it("ESC 키를 누르면 모달이 닫힌다.", () => {
    cy.realPress("Escape");
    cy.get(selectors.MODAL).should("not.be.visible");
  });

  it("모달 바깥을 클릭하면 모달이 닫힌다.", () => {
    cy.get(selectors.MODAL).click("topRight");
    cy.get(selectors.MODAL).should("not.be.visible");
  });
});
