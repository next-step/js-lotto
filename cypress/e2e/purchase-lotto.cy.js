describe("로또 구매 입력창 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("로또 구매 폼을 렌더링한다.", () => {
    cy.get(".purchase-section form").should("exist");
    cy.get(".purchase-section form input").should(
      "have.attr",
      "placeholder",
      "구입 금액을 입력해주세요."
    );
    cy.get(".purchase-section form button").should("have.text", "확인");
  });

  it("구입 금액 input에 숫자가 아닌 글자를 입력하면 입력되지 않는다.", () => {
    cy.get(".purchase-section form input").type("천원");
    cy.get(".purchase-section form input").should("have.value", "");
  });

  it("구입 금액 input에는 숫자 6자리까지 입력할 수 있다. 6자리가 초과되면 입력되지 않는다.", () => {
    cy.get(".purchase-section form input").type("1234567");
    cy.get(".purchase-section form input").should("have.value", "123456");
  });
});

describe("로또 구매 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("구입 금액을 1000원 단위로 입력하지 않는 경우, alert 창에 에러 메시지가 노출된다", () => {
    cy.get(".purchase-section form input").type("1999");
    cy.get(".purchase-section form button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("구입 금액은 1000원 단위로 입력해야 합니다.");
    });
  });

  it("구입 금액을 1000원 단위로 입력 후 확인 버튼 클릭 시, 구매한 로또 결과가 노출된다.", () => {
    cy.get(".purchase-section form input").type("1000");
    cy.get(".purchase-section form button").click();

    cy.get(".purchase-result-step").should("be.visible");
    cy.get(".purchase-result-step").should(
      "contain",
      "총 1개를 구매하였습니다."
    );
  });

  it("구입 금액을 1000원 단위로 입력 후 엔터 키를 누를 시에도, 구매한 로또 결과가 노출된다", () => {
    cy.get(".purchase-section form input").clear();
    cy.get(".purchase-section form input").type("3000");
    cy.get(".purchase-section form input").type("{enter}");

    cy.get(".purchase-result-step").should("be.visible");
    cy.get(".purchase-result-step").should(
      "contain",
      "총 3개를 구매하였습니다."
    );
  });

  it("로또 구매에 성공할 경우 당첨 번호 입력 폼이 노출된다", () => {
    cy.get(".purchase-section form input").clear();
    cy.get(".purchase-section form input").type("5000");

    cy.get(".purchase-section form button").click();

    cy.get(".draw-numbers-section form").should("be.visible");
    cy.get(".draw-numbers-section form label")
      .eq(0)
      .should("have.text", "당첨 번호");
    cy.get(".draw-numbers-section form label")
      .eq(1)
      .should("have.text", "보너스 번호");
  });
});
