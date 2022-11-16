import { MESSAGE } from '../../src/js/util/Constant.js';

describe('로또 요구사항을 테스트한다', () => {
  const URL = '../../index.html';

  const getDataCySelector = (value) => `[data-cy=${value}]`;
  const selectors = {
    inputAmount: getDataCySelector('input-purchasing-amount'),
    btnConfirm: getDataCySelector('btn-confirm'),
    labelPurchasingStatus: getDataCySelector('purchasing-status'),
    lottoIcons: getDataCySelector('lotto-icons'),
    toggleVisibleNumbers: getDataCySelector('toggle-visible-numbers'),
    inputWinningNumber: getDataCySelector('input-winning-number'),
    inputBonusNumber: getDataCySelector('input-bonus-number'),
    btnWinning: getDataCySelector('btn-result'),
    spanLottoDetails: '.lotto-detail',
  };

  const TEST_NUMBER = {
    WINNING_NUMBERS: [1, 2, 3, 4, 5, 6],
    BONUS_NUMBER: 7,
  };

  beforeEach(() => {
    cy.visit(URL);
  });

  //TODO: 아직 다 예외 케이스를 입력하지 않았음에 주의
  describe('로또 구입 금액을 입력한다', () => {
    it('구입 금액을 입력할 input 태그가 있다', () => {
      cy.get(selectors.inputAmount);
    });

    it('구입하기 전까지는 구매 결과 섹션과 당첨번호 폼이 화면에 보이지 않아야 한다', () => {
      cy.get('.result-section').should('not.be.visible');
      cy.get('.winning-form').should('not.be.visible');
    });

    it('로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여야 한다', () => {
      cy.get(selectors.inputAmount).type('1000').should('value', '1000');
    });

    it('금액은 숫자만 입력이 가능하다', () => {
      [
        ['a1000', '1000'],
        ['2000a', '2000'],
        ['30a00', '3000'],
      ].forEach(([type, should]) => {
        cy.get(selectors.inputAmount).clear().type(type).should('value', should);
      });
    });

    it.only('금액은 양수 1,000원부터 가능하다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      ['-1000', '0', '100'].forEach((type) => {
        cy.get(selectors.inputAmount).clear().type(type);
        cy.get(selectors.btnConfirm)
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_AMOUNT_MIN);
          });
      });
    });
  });

  describe('금액에 해당하는 로또를 발급해야 한다', () => {
    it('확인 버튼을 클릭할 수 있어야 한다', () => {
      cy.get(selectors.inputAmount).clear().type('1000');
      cy.get(selectors.btnConfirm).click();
    });

    it('로또 구입 금액은 1000원 단위가 아닌 경우의 수에 대한 예외 발생', () => {
      const stub = cy.stub();

      cy.on('window:alert', stub);
      ['1500', '1501', '1999', '59990'].forEach((type) => {
        cy.get(selectors.inputAmount).clear().type(type);
        cy.get(selectors.btnConfirm)
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_AMOUNT_UNIT);
          });
      });
    });

    it('확인 버튼을 클릭했을 때 입력한 금액에 맞는 로또 개수가 발급되어야 한다', () => {
      const amount = 3;
      cy.get(selectors.inputAmount).type('3000');
      cy.get(selectors.btnConfirm).click();
      cy.get(selectors.lottoIcons).find('li').should('have.length', amount);
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 한다', () => {
    it('몇 개를 구매하였는지 안내하는 문구가 있다', () => {
      const amount = 3;
      cy.get(selectors.inputAmount).type('3000');
      cy.get(selectors.btnConfirm).click();
      const getPurchasingStatus = (amount = 0) => `총 ${amount}개를 구매하였습니다.`;
      cy.get(selectors.labelPurchasingStatus).contains(getPurchasingStatus(amount));
    });
  });

  describe('복권 번호는 번호 보기 토글 버튼을 클릭하면 볼 수 있어야 한다', () => {
    it('번호 보기용 토글이 있다', () => {
      cy.get(selectors.toggleVisibleNumbers);
    });

    it('번호 보기용 토글을 누르면 로또 번호가 구입한 개수만큼 보여야 한다', () => {
      cy.get(selectors.inputAmount).type('4000');
      cy.get(selectors.btnConfirm).click();
      cy.get(selectors.toggleVisibleNumbers).click();

      cy.get(selectors.spanLottoDetails).should('have.length', 4);
    });
  });

  describe('당첨 결과를 입력하고 결과 확인을 누르면 모달 창이 떠야 한다', () => {
    beforeEach(() => {
      cy.get(selectors.inputAmount).clear().type('1000');
      cy.get(selectors.btnConfirm).click();
    });

    it('로또 구매 후 결과 확인 버튼을 누를 수 있어야 한다', () => {
      cy.get(selectors.btnWinning).click();
    });

    it('당첨 번호를 입력할 수 있는 입력 상자가 6개 있다', () => {
      cy.get(selectors.inputWinningNumber).its('length').should('eq', 6);
    });

    it('당첨 번호와 보너스 번호 필드가 모두 입력되어야 결과를 확인할 수 있다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(selectors.btnWinning)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_MODAL);
        });
    });

    it('당첨 번호와 보너스 번호에 입력할 수 있는 숫자의 범위는 1~45까지이다', () => {
      const invalidNumbers = [-1, 49, 100, 0];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      const testInvalidNumber = (invalidNumber) => {
        const myWinnings = [invalidNumber, ...TEST_NUMBER.WINNING_NUMBERS];
        cy.get(selectors.inputWinningNumber).each(($el, index) => {
          cy.wrap($el).clear().type(myWinnings[index]);
        });
        cy.get(selectors.inputBonusNumber).clear().type(TEST_NUMBER.BONUS_NUMBER);
        cy.get(selectors.btnWinning)
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
          });
      };

      invalidNumbers.forEach((invalidNumber) => testInvalidNumber(invalidNumber));
    });

    it('당첨 번호와 보너스 번호의 필드는 서로 겹치지 않아야 한다', () => {
      const numbers = [1, 1, 2, 3, 4, 5];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(selectors.inputWinningNumber).each(($el, index) => {
        cy.wrap($el).clear().type(numbers[index]);
      });
      cy.get(selectors.inputBonusNumber).clear().type(2);
      cy.get(selectors.btnWinning)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
        });
    });
  });
});
