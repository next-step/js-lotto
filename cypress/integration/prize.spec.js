describe("당첨 번호 및 보너스 번호 설정 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");

    cy.get("input").get(".payment").type("3000");
    cy.get("button").get(".purchase").click();

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
  });
});
