describe("로또 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("로또를 구매하면 구매한 개수가 표시되어야 한다", () => {
    cy.get("#amountInput").type("5000");
    cy.get("#buyButton").click();

    cy.get(".lotto-count").should("contain", "총 5개를 구매하였습니다.");
    cy.get(".lotto-ticket").should("have.length", 5);
  });

  it("당첨 번호 입력 후 결과 확인 버튼을 누르면 결과 모달이 표시되어야 한다", () => {
    cy.get("#amountInput").type("5000");
    cy.get("#buyButton").click();

    cy.get(".winning-number").each(($el, index) => {
      cy.wrap($el).type(`${index + 1}`);
    });
    cy.get(".bonus-number").type("7");

    cy.get("#checkResultsButton").click();
    cy.get("#resultModal").should("be.visible");
  });

  it("당첨 결과 확인 후 수익률이 표시되어야 한다", () => {
    cy.get("#amountInput").type("5000");
    cy.get("#buyButton").click();

    cy.get(".winning-number").each(($el, index) => {
      cy.wrap($el).type(`${index + 1}`);
    });
    cy.get(".bonus-number").type("7");

    cy.get("#checkResultsButton").click();
    cy.get("#profit-rate").should("contain", "당신의 총 수익률은");
  });

  it("재시작 버튼을 누르면 입력 값이 초기화되어야 한다", () => {
    cy.get("#amountInput").type("5000");
    cy.get("#buyButton").click();
    cy.get(".winning-number").each(($el, index) => {
      cy.wrap($el).type(`${index + 1}`);
    });
    cy.get(".bonus-number").type("7");
    cy.get("#checkResultsButton").click();

    cy.get("#restartButton").click();
    cy.get("#amountInput").should("have.value", "");
  });

});
