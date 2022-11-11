describe('로또 요구사항을 테스트한다', () => {
  const URL = '../../index.html';

  const getSelector = (value) => `[data-cy=${value}]`;
  const dom = {
    inputAmount: getSelector('input-purchasing-amount'),
    btnConfirm: getSelector('btn-confirm'),
    labelPurchasingStatus: getSelector('purchasing-status'),
    lottoIcons: getSelector('lotto-icons'),
    toggleVisibleNumbers: getSelector('toggle-visible-numbers'),
  };

  const MESSAGE = {
    INVALID_AMOUNT_UNIT: '구매 금액은 1,000원 단위로만 입력이 가능합니다',
  };

  const messageFunction = {
    getPurchasingStatus: (amount = 0) => `총 ${amount}개를 구매하였습니다.`,
  };

  beforeEach(() => {
    cy.visit(URL);
  });

  //TODO: 아직 다 예외 케이스를 입력하지 않았음에 주의
  describe('로또 구입 금액을 입력한다', () => {
    it('구입 금액을 입력할 input 태그가 있다', () => {
      cy.get(dom.inputAmount);
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
      cy.get(dom.btnConfirm).click();
    });

    it.skip('로또 구입 금액은 1000원 단위가 아닌 경우의 수에 대한 예외 발생', () => {
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
      cy.get(dom.lottoIcons).find('span').should('have.length', amount);
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

  describe.only('복권 번호는 번호 보기 토글 버튼을 클릭하면 볼 수 있어야 한다', () => {
    it('번호 보기용 토글이 있다', () => {
      cy.get(dom.toggleVisibleNumbers);
    });
  });
});
