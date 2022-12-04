import { MESSAGES } from "../../src/js/constants.js";
import { calculateEarningRates, getAnalytics } from "../../src/js/utils.js";

const purchaseAmountInput = "[data-cy='purchase-amount-input']";
const purchaseButton = "[data-cy='purchase-button']";
const purchaseTotalCount = "[data-cy='purchase-total-count']";
const showNumberToggle = "[data-cy='show-lotto-number-toggle']";
const lottoNumberLabel = "[data-cy='lotto-number']";

const onInputLastWinningNumbers = (numbers) => {
  numbers.forEach((number, index) => {
    cy.get(`#lotto-number-${index + 1}`).type(number);
  });
};

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
      cy.get(purchaseAmountInput).type("0");
      cy.alertMessage(MESSAGES.WRONG_PURCHASE_PRICE);
    });

    it("10001을 입력한다.", () => {
      cy.get(purchaseAmountInput).type("10001");
      cy.alertMessage(MESSAGES.WRONG_PURCHASE_PRICE);
    });
    it("1234를 입력한다.", () => {
      cy.get(purchaseAmountInput).type("1234");
      cy.alertMessage(MESSAGES.WRONG_PURCHASE_PRICE);
    });
    it("10000000를 입력한다.", () => {
      cy.get(purchaseAmountInput).type("10000000");
      cy.alertMessage(MESSAGES.WRONG_PURCHASE_PRICE);
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
      cy.get(lottoNumberLabel).should("exist");
    });
    it("번호보기 토글 버튼이 off인 경우 복권 번호가 노출되지 않는다.", () => {
      cy.get(lottoNumberLabel).should("not.exist");
    });
  });

  context("소비자는 자동 구매를 할 수 있어야 한다.", () => {
    let lottoNumbers = [];
    beforeEach(() => {
      cy.get(purchaseAmountInput).type("1000");
      cy.get(purchaseButton).click();
      cy.get(showNumberToggle).click();
      cy.get(lottoNumberLabel)
        .invoke("text")
        .then((numbers) => {
          lottoNumbers = numbers.split(",");
        });
    });

    it("로또 1장을 구매하면 6개의 번호가 생성된다.", () => {
      expect(lottoNumbers.length).to.be.eq(6);
    });
    it("숫자의 범위는 1~45 이내이다.", () => {
      const limitNumbers = [...Array(45)].map((_, index) => index + 1);

      lottoNumbers.forEach((number) => {
        expect(limitNumbers.includes(+number)).to.be.eq(true);
      });
    });
  });

  context("지난주 로또 당첨 번호를 입력한다.", () => {
    let alertStub;
    beforeEach(() => {
      cy.get(purchaseAmountInput).type("1000");
      cy.get(purchaseButton).click();

      alertStub = cy.stub();
      cy.on("window:alert", alertStub);
    });

    it("1~45까지의 숫자만 입력 가능하다.", () => {
      onInputLastWinningNumbers([0, 2, 3, 4, 5, 6, 7]);

      cy.get("#last-winning-numbers-form")
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGES.WRONG_LOTTO_NUMBER
          );
        });
    });

    it("숫자는 중복되어서는 안된다.", () => {
      onInputLastWinningNumbers([1, 1, 1, 1, 1, 1, 1]);

      cy.get("#last-winning-numbers-form")
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            MESSAGES.WRONG_LOTTO_NUMBER
          );
        });
    });
  });

  context("당첨번호 [1, 2, 3, 4, 5, 6] 보너스 번호 [7]", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6, 7];

    it("3개 동일 - 로또 번호 [1, 2, 3, 10, 11, 12, 13]", () => {
      const lottoNumbers = [[1, 2, 3, 10, 11, 12, 13]];

      const [three] = getAnalytics(lottoNumbers, winningNumbers);

      expect(three).to.be.eq(1);
    });
    it("4개 동일 - 로또 번호 [1, 2, 3, 4, 11, 12, 13]", () => {
      const lottoNumbers = [[1, 2, 3, 4, 11, 12, 13]];

      const [, four] = getAnalytics(lottoNumbers, winningNumbers);

      expect(four).to.be.eq(1);
    });
    it("5개 동일 - 로또 번호 [1, 2, 3, 4, 5, 12, 13]", () => {
      const lottoNumbers = [[1, 2, 3, 4, 5, 12, 13]];

      const [, , five] = getAnalytics(lottoNumbers, winningNumbers);

      expect(five).to.be.eq(1);
    });
    it("5개 동일 + 보너스 번호 - 로또 번호 [1, 2, 3, 4, 5, 10, 7]", () => {
      const lottoNumbers = [[1, 2, 3, 4, 5, 10, 7]];

      const [, , , fiveWithBonus] = getAnalytics(lottoNumbers, winningNumbers);

      expect(fiveWithBonus).to.be.eq(1);
    });
    it("6개 동일 - 로또 번호 [1, 2, 3, 4, 5, 6, 14]", () => {
      const lottoNumbers = [[1, 2, 3, 4, 5, 6, 14]];

      const [, , , , six] = getAnalytics(lottoNumbers, winningNumbers);

      expect(six).to.be.eq(1);
    });

    context("보너스 번호가 동일한 경우", () => {
      it("로또 번호 [1, 2, 3, 4, 8, 9, 7]의 경우 보너스 번호 포함 5개가 동일로 처리된다.", () => {
        const lottoNumbers = [[1, 2, 3, 4, 8, 9, 7]];

        const [, , five] = getAnalytics(lottoNumbers, winningNumbers);

        expect(five).to.be.eq(1);
      });
      it("로또 번호 [10, 2, 3, 4, 5, 6, 7]의 경우 5개 동일 + 보너스 동일로 처리된다.", () => {
        const lottoNumbers = [[10, 2, 3, 4, 5, 6, 7]];

        const [, , , fiveWithBonus] = getAnalytics(
          lottoNumbers,
          winningNumbers
        );

        expect(fiveWithBonus).to.be.eq(1);
      });
    });
    it("로또 번호 [1, 2, 3, 4, 5, 7, 6]인 경우 7개의 숫자가 동일하지만 5개 동일로 처리된다.", () => {
      const lottoNumbers = [[1, 2, 3, 4, 5, 7, 6]];

      const [, , five] = getAnalytics(lottoNumbers, winningNumbers);

      expect(five).to.be.eq(1);
    });
    it("로또 번호 [1, 2, 3, 4, 5, 7, 8]인 경우 6개의 숫자가 동일하지만 5개 동일로 처리된다.", () => {
      const lottoNumbers = [[1, 2, 3, 4, 5, 7, 8]];

      const [, , five] = getAnalytics(lottoNumbers, winningNumbers);

      expect(five).to.be.eq(1);
    });
  });

  context("수익률을 계산한다.", () => {
    it("수익 10만원, 투자 50만원인 경우 수익률은 -80%", () => {
      const earningRates = calculateEarningRates(100_000, 500_000);
      expect(earningRates).to.be.eq(-80);
    });

    it("수익 50만원, 투자 50만원인 경우 수익률은 0%", () => {
      const earningRates = calculateEarningRates(500_000, 500_000);
      expect(earningRates).to.be.eq(0);
    });

    it("수익 100만원, 투자 50만원인 경우 수익률은 100%", () => {
      const earningRates = calculateEarningRates(1_000_000, 500_000);
      expect(earningRates).to.be.eq(100);
    });
  });
});
