describe("로또게임 페이지 테스트", () => {
  it("should visit", () => {
    cy.visit("/");
  });
  it("금액 입력창이 비워져있다.", () => {
    cy.get("#payment-cost-input").should("have.value", "");
  });
});

describe("input button 테스트", () => {
  it("input 버튼을 누른다.", () => {
    cy.get("#payment-button").click();
  });
});

describe("input 테스트", () => {
  it("input에 숫자를 넣는 테스트", () => {
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
  });
  it("로또가격을 1000원 단위가 아닌경우", () => {
    cy.visit("/");
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1200");
    cy.get("#payment-button").click();
  });
  cy.on("window:alert", (text) => {
    expect(text).to.equal("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
  });
  cy.on("window:confirm", () => true);
});

describe("번호보기 토글버튼 테스트", () => {
  it("토글버튼 클릭했을때 ", () => {
    cy.visit("/");
    cy.get("#payment-cost-input").click();
    cy.get("#payment-cost-input").type("1000");
    cy.get("#payment-button").click();
    cy.get(".lotto-numbers-toggle-button").click();
  });
});
