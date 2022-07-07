import { PRICE_INPUT } from "../../src/js/constants/selectors";

describe("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
  it("로또 구입 금액을 입력할 수 있다.", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get(PRICE_INPUT).type("1000").should("have.value", "1000");
  });
});

describe("로또 1장의 가격은 1,000원이다.", () => {});

describe("소비자는 자동 구매를 할 수 있어야 한다.", () => {});

describe("소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.", () => {});

describe("수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.", () => {});
