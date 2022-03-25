describe("로또 앱 테스트", () => {
  beforeEach(() => {
    // given
    cy.visit("http://192.168.0.10:5500/index.html");
  });

  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    // when
    cy.get("#purchase-price").type(3000);
    cy.get("#purchase-button").click();

    // then
    cy.get("#purchased-lotto-count").should("have.text", "3");
    cy.get(".lotto-item").should("have.length", 3);
  });

  it("로또 구매시 1,000원 미만의 금액을 입력하면, 구매가 되지않고 경고창이 뜬다.", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    // when
    cy.get("#purchase-price").type(950);
    cy.get("#purchase-button")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith("구입 금액은 1,000원 단위로 입력해 주세요.");
      });
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    // given
    cy.get("#purchase-price").type(3000);
    cy.get("#purchase-button").click();

    // when
    cy.get(".lotto-numbers-toggle-button").check({ force: true });

    // then
    cy.get(".lotto-numbers").should("be.visible");
  });

  it("번호보기 토글이 클릭된 상태에서 한번 더 클릭하면 번호가 보이지 않아야 한다.", () => {
    // given
    cy.get("#purchase-price").type(3000);
    cy.get("#purchase-button").click();
    cy.get(".lotto-numbers-toggle-button").click({ force: true });

    // when
    cy.get(".lotto-numbers-toggle-button").click({ force: true });

    // then
    cy.get(".lotto-numbers").should("not.be.visible");
  });

  it("로또를 구매하기 전에는 로또 구매 내역과 당첨 번호 확인 화면이 보이지 않아야 한다.", () => {
    // then
    cy.get("#purchase-result").should("not.be.visible");
    cy.get("#confirm-winning-numbers").should("not.be.visible");
  });

  it("로또를 구매한 상태에서 다시 구매하면, [번호보기] 토글은 off 상태로 초기화되어야 한다.", () => {
    // given
    cy.get("#purchase-price").type(3000);
    cy.get("#purchase-button").click();

    // when
    cy.get("#purchase-price").clear();
    cy.get("#purchase-price").type(5000);
    cy.get("#purchase-button").click();

    // then
    cy.get(".lotto-numbers-toggle-button").should("not.be.checked");
  });
});
