import { LOTTO, ERROR_MESSAGES } from "../../src/js/constants.js";
import { getRandomNumbers } from "../../src/js/Lotto/LottoGenerator.js";

describe("로또", () => {
  const inputAmounSelector = "#lotto-input-form input";
  const confirmPurchaseBtnSelector = "#lotto-input-form .confirm-purchase";
  const purchaseResultSelector = ".purchase-result-txt span";
  const purchaseResultSectionSelector = ".purchase-result";
  const purchaseResultLottoIconSelector = ".lotto-icon";
  const switchInputelector = ".switch input[type=checkbox]";
  const winningNumberSelector = ".winning-number";
  const bonusNumberSelector = ".bonus-number";
  const $modal = ".modal";
  const $modalClose = ".modal-close";
  const $openResultModalButton = ".open-result-modal-button";
  const $restartButton = ".restart";

  before(() => {
    cy.visit("../../../index.html");

    it("구입 금액을 입력할 input 태그가 있다.", () => {
      cy.get(inputAmounSelector).should("exist");
    });
    it("자동발급을 위해 누르는 확인 버튼이 있다.", () => {
      cy.get(confirmPurchaseBtnSelector).should("exist");
    });
  });

  context("구입 금액을 입력할 input에 금액을 입력하면 ", () => {
    it("로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여진다. ", () => {
      cy.get(inputAmounSelector).type(900);
      cy.get(inputAmounSelector).should("have.value", 900);
      cy.get(inputAmounSelector).clear();
    });
    it("로또 구입 금액을 입력하면 화면에 입력한 금액이 숫자만 보여진다. ", () => {
      cy.get(inputAmounSelector).type("900a");
      cy.get(inputAmounSelector).should("have.value", 900);
      cy.get(inputAmounSelector).clear();
    });
  });

  context("자동발급을 위해 누르는 확인 버튼을 클릭하면", () => {
    it("1,000원 단위로 발급이 불가하면 얼럿창을 띄운다", () => {
      const invalidAlertStub = cy.stub();
      cy.on("window:alert", invalidAlertStub);

      cy.get(inputAmounSelector).type(900);
      cy.get(confirmPurchaseBtnSelector)
        .click()
        .then(() => {
          expect(invalidAlertStub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGES.WRONG_INPUT
          );
        });
      cy.get(inputAmounSelector).clear();
    });

    it(`유효한 금액이면, 
        총 “금액/1000”개를 구매하였습니다 텍스트가 노출되고,
        갯수만큼 티켓 이미지가 노출된다.`, () => {
      cy.get(inputAmounSelector).type(4000);
      cy.get(confirmPurchaseBtnSelector).click();

      cy.get(purchaseResultSelector).should("have.text", 4000 / 1000);
      cy.get(purchaseResultLottoIconSelector).should(
        "have.length",
        4000 / 1000
      );
    });
  });

  context("번호보기 스위치를 눌렀을 때 ", () => {
    it("(금액/1000개)의 각 로또 번호는 6개의 랜덤한 1~45 사이의 숫자이며 중복되지 않는다.", () => {
      cy.get(switchInputelector).check({ force: true });
      cy.get("#lotto-icons li").should("have.length", 4000 / 1000);

      const lottoDetails = cy.get(".lotto-detail");
      lottoDetails.each(($el) => {
        const text = $el.text();
        const numArray = text.split(",");
        const lottoNumberSet = new Set();

        expect(numArray.length).to.equal(LOTTO.LOTTO_COUNT_PER_ONE_TICKET);
        expect(numArray).to.be.instanceOf(Array);
        numArray.forEach((el) => {
          expect(lottoNumberSet.has(el)).to.equal(false);
          expect(Number(el)).within(
            LOTTO.LOTTO_NUMBER_MIN,
            LOTTO.LOTTO_NUMBER_MAX
          );
          lottoNumberSet.add(el);
        });
      });
    });
  });

  context("당첨번호와 보너스번호를 입력한 후 폼을 제출하면,", () => {
    it("중복된 로또번호가 있을 때는 제출되지 않고 사용자에게 알린다.", () => {
      const doubledNumbers = [22, 22, 22, 23, 23, 23];
      const invalidAlertStub = cy.stub();
      cy.on("window:alert", invalidAlertStub);

      cy.get(winningNumberSelector).each(($inputEl, i) => {
        cy.wrap($inputEl).type(doubledNumbers[i]);
      });
      cy.get(bonusNumberSelector).type(26);

      cy.get(".open-result-modal-button")
        .click()
        .then(() => {
          expect(invalidAlertStub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGES.DUPLICATED_NUMBERS
          );
        });

      cy.get(winningNumberSelector).clear();
      cy.get(bonusNumberSelector).clear();
    });

    it("일치된 로또 번호 개수에 따라 당첨개수와 당첨금을 모달창에 보여준다.", () => {
      const randomNumbers = Array.from(getRandomNumbers({ count: 7 }));
      cy.get(winningNumberSelector).each(($inputEl, i) => {
        cy.wrap($inputEl).type(randomNumbers[i]);
      });
      cy.get(bonusNumberSelector).type(randomNumbers[6]);

      cy.get($openResultModalButton)
        .click()
        .then(() => {
          cy.get($modal).should("have.class", "open");
        });

      for (const [key, value] of Object.entries(LOTTO.LOTTO_WINNING_CNT)) {
        cy.get(`.winning-count-${value}`).should("not.have.text", "n");
      }
    });

    it("모달창에 닫기 버튼을 누르면 모달창을 닫는다.", () => {
      cy.get($modalClose)
        .click()
        .then(() => {
          cy.get($modal).should("not.have.class", "open");
        });
    });
  });

  context("모달창에 있는 다시 시작하기 버튼을 누르면 ", () => {
    it("구매금액, 구매한 로또번호 정보(개수와 숫자), 당첨통계들이 초기화된다.", () => {
      cy.get($restartButton).click();

      expect(inputAmounSelector).to.be.empty;
      expect(purchaseResultSectionSelector).to.have("hidden");
      expect(purchaseResultLottoIconSelector).to.be.empty;
      expect(modal).to.not.have("open");
      expect(winningNumberSelector).to.be.empty;
      expect(bonusNumberSelector).to.be.empty;
    });
    it("초기와 같이 구매할 수 있는 입력창과 확인 버튼을 다시 볼 수 있으며 다시 구매할 수 있다.", () => {
      it("구입 금액을 입력할 input 태그가 있다.", () => {
        cy.get(inputAmounSelector).should("exist");
      });
      it("자동발급을 위해 누르는 확인 버튼이 있다.", () => {
        cy.get(confirmPurchaseBtnSelector).should("exist");
      });
    });
  });
});
