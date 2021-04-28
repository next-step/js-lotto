import { getCardCount } from "../../src/js/utils/utils.js";
import { MSG } from "../../src/js/utils/constant.js";

describe("로또", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8888/");
  });

  /**
   * - [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
   * - [x] 로또 1장의 가격은 1,000원이다.
   * - [x] 소비자는 **자동 구매**를 할 수 있어야 한다.
   * - [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.
   * */
  const commClass = {
    priceInput: ".price-area input",
    priceButton: ".price-area button",
    toggleInput: ".switch input",
    toggleButton: ".switch span",
  };

  context("로또 구입 금액을 입력", () => {
    it("금액 미입력", () => {
      cy.get(commClass.priceInput).invoke("val", null);
      cy.get(commClass.priceButton)
        .click()
        .then(() => {
          cy.on("window:alert", (str) => {
            expect(str).should("have.text", MSG.INPUT_PRICE);
          });
        });
    });

    it("금액 단위 잘못 입력", () => {
      cy.get(commClass.priceInput).invoke("val", 123456);
      cy.get(commClass.priceButton)
        .click()
        .then(() => {
          cy.on("window:alert", (str) => {
            expect(str).should("have.text", MSG.UNIT_PRICE);
          });
        });
    });

    it("금액 입력 시 카드 발급 영역 활성화", () => {
      const price = 10000;
      cy.get(commClass.priceInput).invoke("val", price);
      cy.get(commClass.priceButton)
        .click()
        .then(() => {
          cy.get(".card-area").should("not.have.class", "d-none");
        });
    });
  });

  context("발급된 카드의 번호 동작", () => {
    const inputPrice = (price) => {
      cy.get(commClass.priceInput).invoke("val", price);
      cy.get(commClass.priceButton).click();
    };

    it("금액 입력 시, 금액에 맞는 카드 발급", async () => {
      const price = 10000;
      const cardCnt = getCardCount(price);

      inputPrice(price);

      await cy.get(".card-count").should("have.text", cardCnt);
      cy.get(".card-list").children().should("have.length", cardCnt);
    });

    it("토글 버튼 활성화 시, 번호 출력", async () => {
      const price = 5000;
      const cardCnt = getCardCount(price);

      inputPrice(price);

      await cy
        .get(commClass.toggleButton)
        .click()
        .then(() => {
          cy.get(commClass.toggleInput).should("be.checked");
          cy.get(".card-list")
            .children()
            .eq(1)
            .find(".card-number")
            .should("have.css", "display", "block");
        });
    });
  });
});
