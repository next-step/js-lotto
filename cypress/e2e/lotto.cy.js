describe("lotto", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5501/");
  });
  it("구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#input-price").type(300);
    cy.get(".btn-cyan")
      .contains("확인")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(
          "로또 구입 금액을 1,000원 단위로 입력해 주세요."
        );
      });
  });
});
