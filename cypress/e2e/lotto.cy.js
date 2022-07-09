describe("lotto", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5501/");
  });
  it("구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#input-price").type(300);
    cy.get("#buy-lotto-button")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(
          "로또 구입 금액을 1,000원 단위로 입력해 주세요."
        );
      });
  });
  it("복권 구입에 성공하면 구입한 금액에 맞는 개수의 복권리스트를 보여준다.", () => {
    cy.get("#input-price").type(3000);
    cy.get("#buy-lotto-button").click();
    cy.get(".lotto-count").should("have.text", "총 3개를 구매하였습니다.");
  });
});
