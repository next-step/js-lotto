import {
  LOTTO_NUMBER_LENGHT,
  LOTTO_MAX_VALUE,
  LOTTO_PRICE,
  LOTTO_NUMBER_SEPARATOR,
} from "../../src/js/util/constant.js";

describe("lotto app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.", () => {
    const numberOfTicket = 5;
    const payment = numberOfTicket * LOTTO_PRICE;

    cy.buy(payment);

    cy.getTotalPurchased().should("have.text", numberOfTicket);
  });

  it("로또 1장의 가격은 1,000원이다.", () => {
    cy.buy(1000);

    cy.getTotalPurchased().should("have.text", 1);
  });

  describe("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    beforeEach(() => {
      cy.buy(LOTTO_PRICE * 20);
    });

    it("로또 한 장은 6개의 숫자를 포함한다", () => {
      cy.getDetailOfTicket().each((el) => {
        const numbers = el.text().split(LOTTO_NUMBER_SEPARATOR);

        expect(numbers).to.have.lengthOf(6);
      });
    });

    it("로또 숫자는 1이상 45이하의 숫자를 포함한다.", () => {
      cy.getDetailOfTicket().each((el) => {
        const numbers = el.text().split(LOTTO_NUMBER_SEPARATOR).map(Number);

        numbers.forEach((number) => {
          expect(number).to.above(0);
          expect(number).to.below(46);
        });
      });
    });

    it("로또 숫자 사이에는 중복이 없다", () => {
      const checkDuplication = (numbers) =>
        numbers.some((number, i) =>
          numbers.some(
            (comparativeNumber, j) => comparativeNumber === number && i !== j
          )
        );

      cy.getDetailOfTicket().each((el) => {
        const numbers = el.text().split(LOTTO_NUMBER_SEPARATOR);

        const isDuplication = checkDuplication(numbers);

        expect(isDuplication).to.equal(false);
      });
    });
  });

  it("복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다. ", () => {
    cy.buy(LOTTO_PRICE);
    cy.clickLottoSwitch();

    cy.getDetailOfTicket().should("be.visible");
  });
});
