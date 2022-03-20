const BASE_URL = "http://localhost:5500";

const payMoney = money => cy.get("#total-amount").type(money);
const clickBuyButton = () => cy.get("#buy-button").click();

const checkQuantity = (money, quantity) => {
  payMoney(money);
  clickBuyButton();
  cy.get("#quantity-text").should("have.text", quantity);
};

describe("로또 테스트", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("로또 금액에 따른 로또 수량 출력 테스트", () => {
    it("1000원을 입력하면 1개를 구입한다", () => {
      checkQuantity(1000, 1);
    });
  });
});
