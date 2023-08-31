describe("로또 구매부분 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  });

  it("구입 금액을 입력하는 input과 구매를 진행하는 button이 존재한다.", () => {
    cy.get("input").get(".payment").should("be.visible");
    cy.get("button").get(".purchase").should("be.visible");
  });

  it("구입 금액이 0인 상태로 확인 버튼을 누르면 alert이 발생한다.", () => {
    cy.get("input").get(".payment").type("-1000");
    cy.get("button").get(".purchase").click();
    cy.get("@alertStub")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", "지불 금액은 0이상 이어야 합니다.");
  });

  it("구입금액 3000을 입력후 확인 버튼을 클릭하면 로또 3개가 구입되며 구입 정보가 화면에 표시된다.", () => {
    cy.get(".purchase-info").should("not.exist");

    cy.get("input").get(".payment").type("3000");
    cy.get("button").get(".purchase").click();

    cy.get(".purchase-info")
      .should("be.visible")
      .and("contain.text", "총 3개를 구매하였습니다.");

    cy.get(".switch").should("be.visible");
  });

  it("3000원 구매후 번호 보기를 클릭하면 로또 3장이 화면에 표시된다.", () => {
    cy.get("input").get(".payment").type("3000");
    cy.get("button").get(".purchase").click();

    cy.get(".lotto-box").should("not.be.visible");

    cy.get("label").get(".switch").click();

    cy.get(".lotto-box").should("be.visible");
    cy.get(".lotto-ticket").should("be.visible").and("have.length", 3);
  });
});
