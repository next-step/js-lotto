const BASE_URL = "http://localhost:5500";

const payMoney = money => cy.get("#total-amount").type(money);
const clickBuyButton = () => cy.get("#buy-button").click();
const checkToggleButton = () =>
  cy.get(".lotto-numbers-toggle-button").check({ force: true });
const buyLottoTicket = (money, quantity) => {
  payMoney(money);
  clickBuyButton();
  cy.get("#quantity-text").should("have.text", quantity);

  cy.get(".ticket-list").should($list => {
    expect($list).to.have.length(quantity);
  });
};

describe("로또 테스트", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("로또 수량 출력 테스트", () => {
    it("1000원을 입력하면 1개의 아이콘이 렌더된다", () => {
      buyLottoTicket(1000, 1);
    });
  });

  describe("번호 보기 버튼 토글 테스트", () => {
    it("토글 버튼을 클릭하면 로또 번호가 렌더된다", () => {
      buyLottoTicket(1000, 1);
      checkToggleButton();
      cy.get(".lotto-detail").should("exist");
    });
  });
});
