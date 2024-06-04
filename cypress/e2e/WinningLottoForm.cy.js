import {
  ErrorLottoNumber,
  ErrorLottoNumbers,
} from "../../src/js/constants/error";

const selectors = {
  PURCHASE_AMOUNT_INPUT: ".purchase-amount-input",
  WINNING_LOTTO_FORM: ".winning-lotto-form",
  WINNING_NUMBER_INPUTS: ".winning-number",
  BONUS_NUMBER_INPUT: ".bonus-number",
  OPEN_RESULT_MODAL_BUTTON: ".open-result-modal-button",
  MODAL: ".modal",
};

const PURCHASE_AMOUNT = 3000;

describe("당첨 로또 입력 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

    // 구매 금액 입력
    cy.get(selectors.PURCHASE_AMOUNT_INPUT).type(PURCHASE_AMOUNT);
    cy.get(selectors.PURCHASE_AMOUNT_INPUT).type("{enter}");
  });

  it("당첨 로또 입력 폼은 당첨 번호 입력을 위한 input 6개와 보너스 번호 입력을 위한 input 1개로 이루어져 있다.", () => {
    cy.get(selectors.WINNING_LOTTO_FORM).should("be.visible");

    cy.get(selectors.WINNING_NUMBER_INPUTS).should("be.visible");
    cy.get(selectors.WINNING_NUMBER_INPUTS).should("have.length", 6);

    cy.get(selectors.BONUS_NUMBER_INPUT).should("be.visible");
  });

  it("1이상 45이하의 서로 다른 숫자 6개의 당첨 번호를 입력하고 또 다른 1이상 45이하의 숫자를 보너스 번호로 입력하고 결과 확인 버튼을 누르면 모달이 보인다.", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    cy.get(selectors.WINNING_NUMBER_INPUTS).each(
      (winningNumberInput, index) => {
        cy.wrap(winningNumberInput).type(winningNumbers[index]);
      }
    );
    cy.get(selectors.BONUS_NUMBER_INPUT).type(bonusNumber);

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).each(
      (winningNumberInput, index) => {
        cy.wrap(winningNumberInput).should("have.value", winningNumbers[index]);
      }
    );
    cy.get(selectors.BONUS_NUMBER_INPUT).should("have.value", bonusNumber);
    cy.get(selectors.OPEN_RESULT_MODAL_BUTTON).click();
    cy.get(selectors.MODAL).should("be.visible");
  });

  it("당첨 번호를 1 미만의 숫자로 입력하고 blur 하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().type("0");
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().blur();

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(
        ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
      );
    });

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().should("have.value", "");
  });

  it("당첨 번호를 45 초과의 숫자로 입력하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().type("46");

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(
        ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
      );
    });

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().should("have.value", "");
  });

  it("보너스 번호를 1 미만의 숫자로 입력하고 blur 하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.BONUS_NUMBER_INPUT).type("0");
    cy.get(selectors.BONUS_NUMBER_INPUT).blur();

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(
        ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
      );
    });

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().should("have.value", "");
  });

  it("보너스 번호를 45 초과의 숫자로 입력하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.BONUS_NUMBER_INPUT).type("46");

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(
        ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
      );
    });

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().should("have.value", "");
  });

  it("당첨 번호를 중복된 숫자로 입력하고 blur 하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().type("1");
    cy.get(selectors.WINNING_NUMBER_INPUTS).eq(2).type("1");
    cy.get(selectors.WINNING_NUMBER_INPUTS).eq(2).blur();

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    });

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).eq(2).should("have.value", "");
  });

  it("보너스 번호를 당첨 번호와 중복된 숫자로 입력하고 blur 하는 순간 alert 메시가 보이며 input은 삭제된다.", () => {
    // given
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().type("1");
    cy.get(selectors.BONUS_NUMBER_INPUT).type("1");
    cy.get(selectors.BONUS_NUMBER_INPUT).blur();

    // when
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.eq(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    });

    // then
    cy.get(selectors.BONUS_NUMBER_INPUT).should("have.value", "");
  });

  it("마지막이 아닌 당첨 번호 input에 두자리 이상의 숫자를 입력하는 순간 다음 input으로 focus 된다.", () => {
    // given // when
    cy.get(selectors.WINNING_NUMBER_INPUTS).first().type("134");

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).eq(1).should("have.focus");
  });

  it("보너스 번호 input에 두자리 이상의 숫자를 입력하는 순간 input은 blur 된다.", () => {
    // given // when
    cy.get(selectors.BONUS_NUMBER_INPUT).type("134");

    // then
    cy.get(selectors.BONUS_NUMBER_INPUT).should("not.have.focus");
  });

  it("마지막 당첨 번호 input에 두자리 이상의 숫자를 입력하는 순간 input은 blur 된다.", () => {
    // given // when
    cy.get(selectors.WINNING_NUMBER_INPUTS).last().type("134");

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).last().should("not.have.focus");
  });

  it("아무것도 입력하지 않고 제출 버튼을 누르면 HTML form validation 이 보여진다.   ", () => {
    // given
    // 아무것도 입력하지 않음

    // when
    cy.get(selectors.OPEN_RESULT_MODAL_BUTTON).click();

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).each(($input, index) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.get(selectors.BONUS_NUMBER_INPUT).should(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("6개의 당첨 번호를 모두 입력하지 않고 제출 버튼을 누르면 HTML form validation 이 보여진다.   ", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5]; // 6개 중 1개 누락
    const bonusNumber = 6;

    // when
    winningNumbers.forEach((winningNumber, index) => {
      cy.get(selectors.WINNING_NUMBER_INPUTS).eq(index).type(winningNumber);
    });
    cy.get(selectors.BONUS_NUMBER_INPUT).type(bonusNumber);
    cy.get(selectors.OPEN_RESULT_MODAL_BUTTON).click();

    // then
    cy.get(selectors.WINNING_NUMBER_INPUTS).should(($inputs) => {
      expect($inputs[5].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("보너스 번호를 입력하지 않고 제출 버튼을 누르면 HTML form validation 이 보여진다.   ", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6]; // 보너스 번호 누락

    // when
    cy.get(selectors.WINNING_NUMBER_INPUTS).each(
      (winningNumberInput, index) => {
        cy.wrap(winningNumberInput).type(winningNumbers[index]);
      }
    );
    cy.get(selectors.OPEN_RESULT_MODAL_BUTTON).click();

    // then
    cy.get(selectors.BONUS_NUMBER_INPUT).should(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });

    cy.get(selectors.BONUS_NUMBER_INPUT).should(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });
});
