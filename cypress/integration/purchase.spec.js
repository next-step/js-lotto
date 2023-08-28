describe("로또 구매부분 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  });

  xit("구입 금액을 입력하는 input과 구매를 진행하는 button이 존재한다.", () => {
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
});
