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

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    cy.get("#input-price").type(3000);
    cy.get("#buy-lotto-button").click();
    cy.get(`#lottery-${0}`).should("have.class", "hide");
    cy.get(".switch").click();
    cy.get(`#lottery-${0}`).should("not.have.class", "hide");
  });

  it("6개의 복권 번호는 중복이 있으면 안된다.", () => {
    cy.get("#input-price").type(3000);
    cy.get("#buy-lotto-button").click();

    cy.get("#lottery-tickets").each(($elements) => {
      const lottoNumbers = $elements[0].textContent
        .split("🎟️")[1]
        .split(",")
        .map(Number);
      const setLottoNumbers = new Set(lottoNumbers);
      expect(setLottoNumbers.size).to.be.equal(6);
    });
  });
});
