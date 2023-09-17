const ELEMENT = Object.freeze({
  PAYMENT_INPUT: () => cy.get("input.payment"),
  PURCHASE_BUTTON: () => cy.get("button.purchase"),
  PURCHASE_INFO: () => cy.get(".purchase-info"),
  LOTTO_BOX: () => cy.get(".lotto-box"),
});

describe("로또 구매부분 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  });

  it("구입 금액을 입력하는 input과 구매를 진행하는 button이 존재한다.", () => {
    ELEMENT.PAYMENT_INPUT().should("be.visible");
    ELEMENT.PURCHASE_BUTTON().should("be.visible");
  });

  it("구입 금액이 0보다 작으면 alert이 발생한다.", () => {
    ELEMENT.PAYMENT_INPUT().type("-1000");
    ELEMENT.PURCHASE_BUTTON().click();
    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "지불 금액은 0이상 이어야 합니다.");
  });

  it("구입금액 3000을 입력후 확인 버튼을 클릭하면 로또 3개가 구입되며 구입 정보가 화면에 표시된다.", () => {
    ELEMENT.PURCHASE_INFO().should("not.exist");

    ELEMENT.PAYMENT_INPUT().type("3000");
    ELEMENT.PURCHASE_BUTTON().click();

    ELEMENT.PURCHASE_INFO()
      .should("be.visible")
      .and("contain.text", "총 3개를 구매하였습니다.");

    cy.get(".switch").should("be.visible");
  });

  it("3000원 구매후 번호 보기를 클릭하면 로또 3장이 화면에 표시된다.", () => {
    ELEMENT.PAYMENT_INPUT().type("3000");
    ELEMENT.PURCHASE_BUTTON().click();

    ELEMENT.LOTTO_BOX().should("not.be.visible");

    cy.get("label.switch").click();

    ELEMENT.LOTTO_BOX().should("be.visible");
    cy.get(".lotto-ticket").should("be.visible").and("have.length", 3);
  });
});
