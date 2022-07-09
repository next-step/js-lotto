beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("구매", () => {
  it("1개당 1000원인 로또를 10장 구매", () => {
    cy.get("#charge input").type(10000);
    cy.get("#charge button[type=submit]").click();
    cy.get("#num-of-lotto").should("contain.text", "10");
  });
});

describe("금액 입력", () => {
  it("정상적인 금액 입력", () => {
    cy.get("#charge input").type(5500);
    cy.get("#charge button[type=submit]").click();
  });

  it("1 개당 가격에 나누어 떨어지지 않는 금액 입력", () => {
    cy.get("#charge input").type(5500);
    cy.get("#charge button[type=submit]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.not.empty;
    });
  });

  it("일반 문자열을 값으로 입력", () => {
    cy.get("#charge input").type("hello world");
    cy.get("#charge input").should("have.value", "");
  });
});
