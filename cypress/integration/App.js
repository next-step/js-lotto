const buyLotto = (price) => {
  cy.get(".input-price").type(price);
  cy.get(".confirm-button").click();
};

describe("로또게임", () => {
  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    cy.visit("/");
    buyLotto(6000);
    cy.get(".user-lotto").should("have.length", 6);
  });

  it("복권 번호는 번호보기 토글버틀을 클릭하면, 숫자를 확인할수 있어야 한다.", () => {
    cy.get(".text-base ").click();
  });
});
