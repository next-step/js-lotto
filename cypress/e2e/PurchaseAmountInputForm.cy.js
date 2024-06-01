const selectors = {
  purchaseAmountInput: ".purchase-amount-input",
  purchaseButton: ".purchase-button",
  lottoListSection: ".lotto-list-section",
};

describe("로또 구매 금액 입력 폼 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("로또 구매 금액 입력 폼은 Input과 Button으로 이루어져 있다.", () => {
    // given // when // then
    cy.get(selectors.purchaseAmountInput).should("exist");
    cy.get(selectors.purchaseButton).should("exist");
  });

  it("Input에 구매 금액을 입력하면 Input의 value가 변경된다.", () => {
    // given // when
    cy.get(selectors.purchaseAmountInput).type("1000");

    // then
    cy.get(selectors.purchaseAmountInput).should("have.value", "1000");
  });

  it("Input에 유효한 금액을 입력하고 Enter 키를 누르면 LottoListSection이 보여진다.", () => {
    // given
    cy.get(selectors.purchaseAmountInput).type("1000");

    // when
    cy.get(selectors.purchaseAmountInput).type("{enter}");

    // then
    cy.get(selectors.lottoListSection).should("be.visible");
  });

  it("Input에 유효한 금액을 입력하고 Button을 클릭하면 LottoListSection이 보여진다.", () => {
    // given
    cy.get(selectors.purchaseAmountInput).type("1000");

    // when
    cy.get(selectors.purchaseButton).click();

    // then
    cy.get(selectors.lottoListSection).should("be.visible");
  });

  it("Input에 아무것도 입력하지 않고 Enter 키를 누르면 HTML form validation이 보여진다.", () => {
    // given // when
    cy.get(selectors.purchaseAmountInput).type("{enter}");

    // then
    cy.get(selectors.purchaseAmountInput).should(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Input에 아무것도 입력하지 않고 Button을 클릭하면 HTML form validation이 보여진다.", () => {
    // given // when
    cy.get(selectors.purchaseButton).click();

    // then
    cy.get(selectors.purchaseAmountInput).should(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("Input에 0 미만의 금액을 입력하고 Enter 키를 누르면 HTML form validation이 보여진다.", () => {
    //given // when
    cy.get(selectors.purchaseAmountInput).type("-1000{enter}");

    // then
    cy.get(selectors.purchaseAmountInput).should(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Value must be greater than or equal to 0."
      );
    });
  });

  it("Input에 0 미만의 금액을 입력하고 Button을 클릭하면 HTML form validation이 보여진다.", () => {
    // given
    cy.get(selectors.purchaseAmountInput).type("-1000");

    // when
    cy.get(selectors.purchaseButton).click();

    // then
    cy.get(selectors.purchaseAmountInput).should(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Value must be greater than or equal to 0."
      );
    });
  });
});
