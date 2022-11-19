import { MESSAGES } from "../../src/js/constants.js";

const purchaseAmountInput = "[data-cy='purchase-amount-input']";
const purchaseButton = "[data-cy='purchase-button']";
const purchaseTotalCount = "[data-cy='purchase-total-count']";
const showNumberToggle = "[data-cy='show-game-number-toggle']";
const gameNumberLabel = "[data-cy='game-number']";

describe("로또 계산기", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  context("로또 구입 금액을 입력한다.", () => {
    it("금액을 입력하는 input이 노출된다.", () => {
      cy.get(purchaseAmountInput).should("exist");
    });
    it("숫자를 123 입력한다.", () => {
      cy.get(purchaseAmountInput).type("123");
      cy.get(purchaseAmountInput).should("have.value", 123);
    });
    it("숫자만 입력 가능한 금액 입력 칸에 문자를 입력한다.", () => {
      cy.get(purchaseAmountInput).type("123a");
      cy.get(purchaseAmountInput).should("have.value", 123);
    });
  });

  context("금액에 해당하는 로또를 발급해야 한다.", () => {
    it("발급 버튼이 있어야 한다.", () => {
      cy.get(purchaseButton).should("exist");
    });
    it("발급 버튼을 클릭할 수 있어야 한다.", () => {
      cy.get(purchaseButton).should("not.be.disabled");
    });
  });

  context("로또 1장의 가격은 1,000원이다.", () => {
    it("1000원을 입력하여 1장을 구매한다.", () => {
      cy.get(purchaseAmountInput).type("1000");
      cy.get(purchaseButton).click();
      cy.get(purchaseTotalCount).should(
        "have.text",
        "총 1개를 구매하였습니다."
      );
    });
    it("6000원을 입력하여 6장을 구매한다.", () => {
      cy.get(purchaseAmountInput).type("6000");
      cy.get(purchaseButton).click();
      cy.get(purchaseTotalCount).should(
        "have.text",
        "총 6개를 구매하였습니다."
      );
    });
    it("4000.원을 입력하여 4장을 구매한다.", () => {
      cy.get(purchaseAmountInput).type("4000");
      cy.get(purchaseButton).click();
      cy.get(purchaseTotalCount).should(
        "have.text",
        "총 4개를 구매하였습니다."
      );
    });
  });

  context("로또 가격에 맞지 않는 금액을 입력한다.", () => {
    it("0을 입력한다.", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(purchaseAmountInput).type("0");
      cy.get(purchaseButton)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGES.WRONG_PURCHASE_PRICE
          );
        });
    });

    it("10001을 입력한다.", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(purchaseAmountInput).type("10001");
      cy.get(purchaseButton)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGES.WRONG_PURCHASE_PRICE
          );
        });
    });
    it("1234를 입력한다.", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(purchaseAmountInput).type("1234");
      cy.get(purchaseButton)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGES.WRONG_PURCHASE_PRICE
          );
        });
    });
  });

  context("번호보기 토글 버튼을 클릭한다.", () => {
    it("번호보기 토글 버튼이 노출된다.", () => {
      cy.get(showNumberToggle).should("exist");
    });
    it("번호보기 토글 버튼이 클릭 가능하다.", () => {
      cy.get(showNumberToggle).should("not.be.disabled");
    });
  });

  context("복권 번호를 볼 수 있다.", () => {
    beforeEach(() => {
      cy.get(purchaseAmountInput).type("1000");
      cy.get(purchaseButton).click();
    });

    it("번호보기 토글 버튼이 on인 경우 복권 번호가 노출된다.", () => {
      cy.get(showNumberToggle).click();
      cy.get(gameNumberLabel).should("exist");
    });
    it("번호보기 토글 버튼이 off인 경우 복권 번호가 노출되지 않는다.", () => {
      cy.get(gameNumberLabel).should("not.exist");
    });
  });

  context("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    let gameNumbers = [];
    beforeEach(() => {
      cy.get(purchaseAmountInput).type("1000");
      cy.get(purchaseButton).click();
      cy.get(showNumberToggle).click();
      cy.get(gameNumberLabel)
        .invoke("text")
        .then((numbers) => {
          gameNumbers = numbers.split(",");
        });
    });

    it("로또 1장을 구매하면 6개의 번호가 생성된다.", () => {
      expect(gameNumbers.length).to.be.eq(6);
    });
    it("숫자의 범위는 1~45 이내이다.", () => {
      const limitNumbers = Array(45)
        .fill()
        .map((_, index) => index + 1);

      gameNumbers.forEach((number) => {
        expect(limitNumbers.includes(+number)).to.be.eq(true);
      });
    });
  });
});
