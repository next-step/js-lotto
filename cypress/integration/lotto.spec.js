describe("로또게임 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("input 버튼을 누른다.", () => {
    cy.get("#payment-button").click();
  });

  it("input에 숫자를 넣는 테스트", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
  });

  it("로또가격을 1000원 단위가 아닌경우", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1200");
    cy.get("#payment-button").click();
  });

  cy.on("window:alert", (text) => {
    expect(text).to.equal("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
  });

  cy.on("window:confirm", () => true);

  it("토글버튼 클릭했을때 ", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
    cy.get("#payment-button").click();
    cy.get(".lotto-numbers-toggle-button").check({ force: true });
    cy.get(".lotto-result").should("be.visible");
    cy.get("#payment-button").click();
    cy.get(".lotto-numbers-toggle-button").uncheck({ force: true });
    cy.get(".lotto-ticket-number").should("not.be.visible");
  });
});
