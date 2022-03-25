import {
  LOTTO_NUMBER_COUNT,
  ERROR_MESSAGE_MIN_TOTAL_AMOUNT,
} from "../../src/js/constant/index.js";
const BASE_URL = "http://localhost:5500";

const payMoney = money => cy.get("#total-amount").type(money);
const clickBuyButton = () => cy.get("#buy-button").click();
const buyLottoTicket = money => {
  payMoney(money);
  clickBuyButton();
};

const checkLottoTicketQuantity = quantity => {
  cy.get("#quantity-text").should("have.text", quantity);
  cy.get(".ticket-list").should($list => {
    expect($list).to.have.length(quantity);
  });
};

const checkToggleButton = () =>
  cy.get(".lotto-numbers-toggle-button").check({ force: true });

const checkLottoNumbersCount = () => {
  cy.get(".lotto-detail").each(el => {
    cy.get(el)
      .invoke("text")
      .then(numbers => numbers.split(",").length)
      .should("equal", LOTTO_NUMBER_COUNT);
  });
};

describe("로또 테스트", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("로또 수량 출력 테스트", () => {
    it("1000원을 입력하면 1개의 아이콘이 렌더된다", () => {
      buyLottoTicket(1000);
      checkLottoTicketQuantity(1);
    });
    it("금액을 입력하지 않으면 alert이 보여진다", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      clickBuyButton().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE_MIN_TOTAL_AMOUNT);
      });
    });

    it("1000원 미만의 값을 입력하면 alert이 보여진다", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);
      payMoney(900);
      clickBuyButton().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE_MIN_TOTAL_AMOUNT);
      });
    });
  });

  describe("번호 보기 버튼 토글 테스트", () => {
    it("토글 버튼을 클릭하면 로또 번호가 렌더된다", () => {
      buyLottoTicket(1000);
      checkToggleButton();
      cy.get(".lotto-detail").should("exist");
    });

    it(`로또 번호는 ${LOTTO_NUMBER_COUNT}개의 숫자이다`, () => {
      buyLottoTicket(1000);
      checkLottoNumbersCount();
    });
  });
});
