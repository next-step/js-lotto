describe("로또 구매 금액 입력 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("로또 구매 금액 입력 폼은 Input과 Button으로 이루어져 있다.", () => {
    cy.get(".purchase-amount-input").should("exist");

    cy.get(".purchase-button").should("exist");
  });

  it("Input에 구매 금액을 입력하면 Input의 value가 변경된다.", () => {
    cy.get(".purchase-amount-input").type("1000");

    cy.get(".purchase-amount-input").should("have.value", "1000");
  });

  it("Input에 유효한 금액을 입력하고 Enter 키를 누르면 LottoListSection이 보여진다.", () => {
    cy.get(".purchase-amount-input").type("1000");

    cy.get(".purchase-amount-input").type("{enter}");

    cy.get(".lotto-list-section").should("be.visible");
  });

  it("Input에 유효한 금액을 입력하고 Button을 클릭하면 LottoListSection이 보여진다.", () => {
    cy.get(".purchase-amount-input").type("1000");

    cy.get(".purchase-button").click();

    cy.get(".lotto-list-section").should("be.visible");
  });

  it("Input에 아무것도 입력하지 않고 Enter 키를 누르면 HTML form validation이 보여진다.", () => {
    cy.get(".purchase-amount-input").type("{enter}");

    cy.get(".purchase-amount-input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Input에 아무것도 입력하지 않고 Button을 클릭하면 HTML form validation이 보여진다.", () => {
    cy.get(".purchase-button").click();

    cy.get(".purchase-amount-input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Input에 0 미만의 금액을 입력하고 Enter 키를 누르면 HTML form validation이 보여진다.", () => {
    cy.get(".purchase-amount-input").type("-1000{enter}");

    cy.get(".purchase-amount-input").then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Value must be greater than or equal to 0."
      );
    });
  });

  it("Input에 0 미만의 금액을 입력하고 Button을 클릭하면 HTML form validation이 보여진다.", () => {
    cy.get(".purchase-amount-input").type("-1000");

    cy.get(".purchase-button").click();

    cy.get(".purchase-amount-input").then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Value must be greater than or equal to 0."
      );
    });
  });
});
