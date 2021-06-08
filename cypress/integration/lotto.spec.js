import { contentType } from "mime-types";
import { MESSAGE } from "../../src/js/constant.js";

import { inputMoneyActivity } from "./cypressFunc/inputMoneyActivity.js";
import { inputLottoNumbers } from "./cypressFunc/inputLottoNumber.js";
import {
  checkLottoDisplay,
  checkToggleButton,
} from "./cypressFunc/checkLottoDisplay.js";
import { pressRestartButton } from "./cypressFunc/pressRestartButton.js";
import { checkModalDisplay } from "./cypressFunc/checkModalDisplay.js";

describe("racing", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const buyTickets = (amount) => {
    inputMoneyActivity(amount, 0, 1);
    checkLottoDisplay(amount);
    checkToggleButton("inline");
    checkToggleButton("none");
  };

  let amount;

  describe("금액 입력 관련", () => {
    it("Case 1 - 금액이 1000 원 보다 낮은 경우", () => {
      amount = "100";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 2 - 금액이 100000 원 보다 높은 경우", () => {
      amount = "120000";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 3 - 금액이 범위에 맞지만 1000원 단위로 나누어 떨어지지 않는 경우", () => {
      amount = "5500";
      inputMoneyActivity(amount, 1, 0);
    });

    it("Case 4 - 숫자가 아닌 값을 입력하는 경우", () => {
      amount = "ABC";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 5 - 정상적인 숫자를 입력하는 경우", () => {
      amount = "7000";
      inputMoneyActivity(amount, 0, 1);
    });
  });

  describe("로또 구매 후 출력 체크", () => {
    it("Case 1 - 1000원 어치 구매", () => {
      amount = "1000";
      buyTickets(amount);

      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 2 - 8000원 어치 구매", () => {
      amount = "8000";
      buyTickets(amount);

      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 3 - 30000원 어치 구매", () => {
      amount = "30000";
      buyTickets(amount);

      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 4 - 100000원 어치 구매", () => {
      amount = "100000";
      buyTickets(amount);

      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 5 - 중복된 번호를 입력하는 경우", () => {
      amount = "1000";
      buyTickets(amount);

      inputLottoNumbers([2, 18, 24, 30, 32, 45]);
      cy.get(".bonus-number").type(32);
      cy.get(".open-result-modal-button").click();
      cy.get("@windowAlert").should("be.calledWith", MESSAGE.NUM_DUP);
    });
  });
});
