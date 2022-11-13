describe('로또 요구사항을 테스트한다', () => {
  const URL = '../../index.html';

  const getDataCySelector = (value) => `[data-cy=${value}]`;
  const dom = {
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

  const MESSAGE = {
    INVALID_AMOUNT_UNIT: '구매 금액은 1,000원 단위로만 입력이 가능합니다',
    INVALID_WINNING_MODAL: '당첨 번호와 보너스 번호를 모두 입력하세요',
    INVALID_WINNING_NUMBER_RANGE: '당첨 번호와 보너스 번호는 1~45까지만 입력할 수 있습니다',
    INVALID_WINNING_NUMBER_DUPLICATED: '당첨 번호와 보너스 번호는 서로 겹칠 수 없습니다',
  };

  const messageFunction = {
    getPurchasingStatus: (amount = 0) => `총 ${amount}개를 구매하였습니다.`,
  };

  const getRandomWinningNumbers = (length = 1) => {
    const set = new Set();
    while (set.size < length) {
      set.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...set];
  };

  beforeEach(() => {
    cy.visit(URL);
  });

  //TODO: 아직 다 예외 케이스를 입력하지 않았음에 주의
  describe('로또 구입 금액을 입력한다', () => {
    it('구입 금액을 입력할 input 태그가 있다', () => {
      cy.get(dom.inputAmount);
    });

    it('구입하기 전까지는 구매 결과 섹션과 당첨번호 폼이 화면에 보이지 않아야 한다', () => {
      cy.get('.result-section').should('not.be.visible');
      cy.get('.winning-form').should('not.be.visible');
    });

    it('로또 구입 금액을 입력하면 화면에 입력한 금액이 그대로 보여야 한다', () => {
      cy.get(dom.inputAmount).type('1000').should('value', '1000');
    });

    it('금액은 숫자만 입력이 가능하다', () => {
      cy.get(dom.inputAmount).type('1000a').should('value', '1000');
      cy.get(dom.inputAmount).clear();
      cy.get(dom.inputAmount).type('aa').should('value', '');
    });
  });

  describe('금액에 해당하는 로또를 발급해야 한다', () => {
    it('확인 버튼을 클릭할 수 있어야 한다', () => {
      cy.get(dom.inputAmount).clear().type('1000');
      cy.get(dom.btnConfirm).click();
    });

    it('로또 구입 금액은 1000원 단위가 아닌 경우의 수에 대한 예외 발생', () => {
      const stub = cy.stub();

      cy.on('window:alert', stub);
      cy.get(dom.inputAmount).type('1500');
      cy.get(dom.btnConfirm)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_AMOUNT_UNIT);
        });
    });

    it('확인 버튼을 클릭했을 때 입력한 금액에 맞는 로또 개수가 발급되어야 한다', () => {
      const amount = 3;
      cy.get(dom.inputAmount).type('3000');
      cy.get(dom.btnConfirm).click();
      cy.get(dom.lottoIcons).find('li').should('have.length', amount);
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 한다', () => {
    it('몇 개를 구매하였는지 안내하는 문구가 있다', () => {
      const amount = 3;
      cy.get(dom.inputAmount).type('3000');
      cy.get(dom.btnConfirm).click();
      cy.get(dom.labelPurchasingStatus).contains(messageFunction.getPurchasingStatus(amount));
    });
  });

  describe('복권 번호는 번호 보기 토글 버튼을 클릭하면 볼 수 있어야 한다', () => {
    it('번호 보기용 토글이 있다', () => {
      cy.get(dom.toggleVisibleNumbers);
    });

    it('번호 보기용 토글을 누르면 로또 번호가 구입한 개수만큼 보여야 한다', () => {
      cy.get(dom.inputAmount).type('4000');
      cy.get(dom.btnConfirm).click();
      cy.get(dom.toggleVisibleNumbers).click();

      cy.get(dom.spanLottoDetails).should('have.length', 4);
    });
  });

  describe('당첨 결과를 입력하고 결과 확인을 누르면 모달 창이 떠야 한다', () => {
    it('결과 확인 버튼을 누를 수 있어야 한다', () => {
      cy.get(dom.btnWinning).click();
    });

    it('당첨 번호를 입력할 수 있는 입력 상자가 6개 있다', () => {
      cy.get(dom.inputWinningNumber).its('length').should('eq', 6);
    });

    it('당첨 번호와 보너스 번호 필드가 모두 입력되어야 결과를 확인할 수 있다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get(dom.btnWinning)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_MODAL);
        });
    });
    it('당첨 번호와 보너스 번호에 입력할 수 있는 숫자의 범위는 1~45까지이다', () => {
      const invalidNumbers = [-1, 49, 100, 0];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      for (const invalidNumber of invalidNumbers) {
        const numbers = getRandomWinningNumbers(6);
        const myWinnings = [invalidNumber, ...numbers.slice(0, 6)];
        const bonus = numbers.slice(5)[0];
        cy.get(dom.inputWinningNumber).each(($el, index) => {
          cy.wrap($el).clear().type(myWinnings[index]);
        });
        cy.get(dom.inputBonusNumber).clear().type(bonus);
        cy.get(dom.btnWinning)
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_NUMBER_RANGE);
          });
      }
    });

    it('당첨 번호와 보너스 번호의 필드는 서로 겹치지 않아야 한다', () => {
      const numbers = [1, 1, 2, 3, 4, 5];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(dom.inputWinningNumber).each(($el, index) => {
        cy.wrap($el).clear().type(numbers[index]);
      });
      cy.get(dom.inputBonusNumber).clear().type(2);
      cy.get(dom.btnWinning)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(MESSAGE.INVALID_WINNING_NUMBER_DUPLICATED);
        });
    });
  });
});
