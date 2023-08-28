describe("로또 구매부분 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");
  });

  xit("구입 금액을 입력하는 input과 구매를 진행하는 button이 존재한다.", () => {
    cy.get("input").get(".payment").should("be.visible");
    cy.get("button").get(".confirm-purchase").should("be.visible");
  });

  it("구입 금액이 0인 상태로 확인 버튼을 누르면 에러메세지가 표시된다.", () => {
    cy.get("input").get(".payment").type("0");
    cy.get("button").get(".confirm-purchase").click();
    cy.get("label")
      .get(".error")
      .should("have.text", "가격은 0보다 커야합니다.");
  });
});
