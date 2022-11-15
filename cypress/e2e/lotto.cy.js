// 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// 로또 1장의 가격은 1,000원이다.
// 소비자는 자동 구매를 할 수 있어야 한다.
// 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

const inputSelector = `[data-cy="purchase-amount"]`;
const buttonSelector = `[data-cy="purchase-button"]`;

describe("로또 구매기능 테스트", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("로또 구입 금액을 입력할 input 태그가 존재한다.", () => {
    cy.get(inputSelector).should("exist");
  });

  it("로또 금액을 입력하면 화면에 입력한 금액이 그대로 보여진다", () => {
    cy.get(inputSelector).type("1000");
    cy.get(inputSelector).should("have.value", "1000");
  });

  it("로또 금액은 숫자만 입력 가능하다.", () => {
    cy.get(inputSelector).type("1000a");
    cy.get(inputSelector).should("have.value", "1000");
  });

  it("클릭할 확인 버튼이 존재한다.", () => {
    cy.get(buttonSelector).should("exist");
  });

  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    cy.get(inputSelector).type("1000").should("have.value", "1000");
  });
});
