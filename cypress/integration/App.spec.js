import { SELECTORS, PRICE_PER_LOTTO } from "../../src/js/constants";

beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("DOM selectors", () => {
  it("$app", () => {
    cy.get(SELECTORS.APP).should("be.visible");
  });

  it("$charge", () => {
    cy.wrap([SELECTORS.CHARGE_FORM, SELECTORS.CHARGE_BUTTON, SELECTORS.CHARGE_INPUT]).each((selector) => {
      cy.get(selector).should("be.visible");
    });
  });

  it("$numOfLotto는 0개를 표시", () => {
    cy.get(SELECTORS.NUMBER_OF_LOTTO).should("contain.text", "0개");
  });

  it("$lotteries는 비어있음", () => {
    cy.get(SELECTORS.LOTTERIES).should("be.empty");
  });
});

describe("금액 입력", () => {
  it("정상적인 금액 입력", () => {
    cy.get(SELECTORS.CHARGE_INPUT).type(5500);
    cy.get(SELECTORS.CHARGE_BUTTON).click();
  });

  it("1 개당 가격에 나누어 떨어지지 않는 금액 입력", () => {
    cy.get(SELECTORS.CHARGE_INPUT).type(5500);
    cy.get(SELECTORS.CHARGE_BUTTON).click();
    cy.on("window:alert", (text) => expect(text).to.contain(PRICE_PER_LOTTO));
  });

  it("일반 문자열을 값으로 입력", () => {
    cy.get(SELECTORS.CHARGE_INPUT).type("hello world");
    cy.get(SELECTORS.CHARGE_INPUT).should("have.value", "");
  });
});

describe("구매", () => {
  it("1개당 1000원인 로또를 10장 구매", () => {
    cy.get(SELECTORS.CHARGE_INPUT).type(10000);
    cy.get(SELECTORS.CHARGE_BUTTON).click();
    cy.get(SELECTORS.NUMBER_OF_LOTTO).should("contain.text", "10");
    cy.get(`${SELECTORS.LOTTERIES} span`).should("have.length", 10);
  });
});
