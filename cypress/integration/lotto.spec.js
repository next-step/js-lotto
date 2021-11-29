import { TICKET } from "../../src/js/constants/lotto.js";
import { STATUS_MESSAGE } from "../../src/js/constants/messages.js";
import { CLASS_NAME, INPUT_NAME } from "../../src/js/constants/selectors.js";

before(() => {
  cy.visit("/");
});

describe("로또 구매", () => {
  const paymentTestSet = [0, 1000, 21000, 1500, 500];
  const invalidInputTestSet = [".", "-", " ", "\n", "\t"];

  it("로또 구입 금액을 입력하면 구매할 수 있는 수만큼 로또를 발급한다.", () => {
    paymentTestSet.forEach((payment) => {
      cy.submitPayment(payment);
      cy.get(CLASS_NAME.TICKET_CONTAINER)
        .find(CLASS_NAME.TICKET)
        .should("have.length", Math.floor(payment / TICKET.PRICE));
    });
  });

  it("로또 구입 후 발급한 로또 수와 남은 금액을 알려준다.", () => {
    paymentTestSet.forEach((payment) => {
      cy.submitPayment(payment);
      cy.get(CLASS_NAME.LOTTO_PURCHASE_STATUS).should(
        "have.text",
        STATUS_MESSAGE.LOTTO_PURCHASE(Math.floor(payment / TICKET.PRICE), payment % TICKET.PRICE)
      );
    });
  });

  it("금액 입력 폼에 점(.)이나 마이너스(-), 공백 등 숫자 외 기호를 표시할 수 없다.", () => {
    invalidInputTestSet.forEach((invalidInput) => {
      cy.get(`input[name="${INPUT_NAME.PAYMENT_INPUT}"]`).type(invalidInput);
      cy.get(`input[name="${INPUT_NAME.PAYMENT_INPUT}"]`).should("not.have.value", invalidInput);
    });
  });
});

describe("구매 티켓 조회", () => {
  const paymentCountTestValue = 3;
  const paymentTestValue = paymentCountTestValue * TICKET.PRICE;

  it("번호보기 토글이 꺼져있으면 티켓 번호를 보여주지 않는다.", () => {
    cy.submitPayment(paymentTestValue);
    cy.get(CLASS_NAME.LOTTO_NUMBER_TOGGLE_BUTTON).uncheck();
    cy.get(CLASS_NAME.LOTTO_NUMBERS).each(($lottoNumbers) => cy.wrap($lottoNumbers).should("have.class", "d-none"));
  });

  it("번호보기 토글이 켜져있으면 티켓 번호를 보여준다.", () => {
    cy.submitPayment(paymentTestValue);
    cy.get(CLASS_NAME.LOTTO_NUMBER_TOGGLE_BUTTON).check({ force: true });
    cy.get(CLASS_NAME.LOTTO_NUMBERS).each(($lottoNumbers) => cy.wrap($lottoNumbers).should("not.have.class", "d-none"));
  });
});
