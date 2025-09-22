describe("로또 구매 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("사용자가 구입 금액 입력란에 숫자가 아닌 값을 입력하면 입력이 되지 않습니다.", () => {
    cy.get(".lotto-price form input").type("천원");
    cy.get(".lotto-price form input").should("have.value", "");
  });
  it("로또는 천원 단위로 구매하지 않으면 경고창이 뜹니다.", () => {
    cy.get(".lotto-price form input").type("1234");
    cy.get(".lotto-price form button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("구매 금액은 1000원 단위로 입력해야 합니다.");
    });
  });
  it("로또는 천원 단위로 구매하면 구매한 로또 정보를 볼 수 있습니다.", () => {
    cy.get(".lotto-price form input").type("10000");
    cy.get(".lotto-price form button").click();

    cy.get(".lotto-result").should("exist");
  });
});
