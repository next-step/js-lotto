import { clickButtonWithSelector, typePriceInput } from "../cypress-util.js";
import { getRandomInteger } from "../../../src/js/util.js";
import {
  RANDOM_INTEGER_CONDITION,
  ALERT_STRING,
} from "../../../src/js/constants.js";

context("STEP 2", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
    typePriceInput("5000");
  });

  it("당첨번호를 입력하지 않고 결과 확인하기 버튼을 누를 경우 번호를 입력하라는 얼럿이 띄워진다. ", () => {
    clickButtonWithSelector(".open-result-modal-button");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_STRING.EMPTY_WINNING_NUMBER_INPUT);
    });
  });

  it("당첨 번호 입력 후 결과 확인하기 버튼을 누르면 당첨 통계와 관련된 모달창이 띄워진다. ", function () {
    cy.get("#winning-number-input-original > div > input").each((input) => {
      const randomInt = getRandomInteger(
        RANDOM_INTEGER_CONDITION.START,
        RANDOM_INTEGER_CONDITION.END
      ).toString();
      console.log(input);
      cy.wrap(input).type(randomInt);
    });
    const randomIntForBonus = getRandomInteger(
      RANDOM_INTEGER_CONDITION.START,
      RANDOM_INTEGER_CONDITION.END
    ).toString();
    cy.get("#winning-number-input-bonus > div > input").type(randomIntForBonus);
    clickButtonWithSelector(".open-result-modal-button");
    cy.get("#statistics").should("be.visible");
  });
});
