describe("로또게임 페이지 테스트", () => {
  it("should visit", () => {
    cy.visit("/");
  });
  it("금액 입력창이 비워져있다.", () => {
    cy.get("#payment-cost-input").should("have.value", "");
  });
});

describe("input 테스트", () => {
  it("input에 숫자를 넣는 테스트", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
  });
});

describe("input button 테스트", () => {
  it("input 버튼을 누른다.", () => {
    cy.get("#payment-button").click();
  });
});
