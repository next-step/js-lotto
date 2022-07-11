const buyLottery = (price) => {
  cy.get(".price-input").type(price);
  cy.get(".buy-btn").click();
};

describe("로또 step1 요구사항", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    buyLottery("3000");
    cy.get(".total-lottie").contains("총 3개를 구매하였습니다.");
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.", () => {
    buyLottery("5323");
    cy.get(".lotto-numbers-toggle-button").check({ force: true });
    cy.get(".lottie-list").should("have.class", "flex-col");

    cy.get("span.mx-1").should("have.length", 5);
  });
});
