const APP_URL = '../../index.html';

Cypress.Commands.add('inputMoney', (money) => {
  cy.get('form.mt-5  input').type(money);
});

Cypress.Commands.add('isEqualMoney', (money) => {
  cy.get('form.mt-5  input').should('have.value', money);
});

Cypress.Commands.add('purchase', () => {
  cy.get('form.mt-5').submit();
});

Cypress.Commands.add('isEqualLottoAmount', (value) => {
  cy.get('section.mt-9 .my-0 span').should('have.text', value);
});

Cypress.Commands.add('showWinningResult', () => cy.get('form.mt-9').submit());

Cypress.Commands.add('isShowPurchaseHistory', () =>
  cy.get('section.mt-9').should('be.visible')
);

Cypress.Commands.add('isHidePurchaseHistory', () =>
  cy.get('section.mt-9').should('not.be.visible')
);

Cypress.Commands.add('isShowWinningResultModal', () =>
  cy.get('div.modal').should('have.class', 'open')
);

Cypress.Commands.add('isHideWinningResultModal', () =>
  cy.get('div.modal').should('not.have.class', 'open')
);

describe('로또 자판기', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('로또 구매를 위한 입력', () => {
    it('숫자 대신 영문자를 입력할 경우, 입력되지 않음', () => {
      cy.inputMoney('ABC');
      cy.isEqualMoney('');
    });

    it('숫자를 넣은경우, 정상적으로 입력됨', () => {
      cy.inputMoney(12300);
      cy.isEqualMoney(12300);
    });
  });

  describe('로또 구매', () => {
    it('금액 지불전 구매한 로또 갯수는 0', () => {
      cy.isEqualLottoAmount(0);
      cy.isHidePurchaseHistory();
    });

    it('금액 지불후 구매한 로또 갯수', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isEqualLottoAmount(3);
      cy.isShowPurchaseHistory();
    });

    it('로또 구매후 당첨 결과를 입력하지 않은채 결과보기시 화면이 나타나지 않음', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isShowPurchaseHistory();
      cy.showWinningResult();
      cy.isHideWinningResultModal();
    });

    it('로또 구매후 당첨 결과를 모두 입력하지 않은 경우 결과보기시 화면이 나타나지 않음', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isShowPurchaseHistory();
      cy.get('input.winning-number').then((els) => {
        [...els].forEach((el) => {
          cy.wrap(el).type('1');
        });
        cy.showWinningResult();
        cy.isHideWinningResultModal();
      });
    });

    it('로또 구매후 당첨 결과를 중복되게 입력된 경우 결과보기시 화면이 나타나지 않음', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isShowPurchaseHistory();
      cy.get('input.winning-number, input.bonus-number').then((els) => {
        [...els].forEach((el) => {
          cy.wrap(el).type('1');
        });
        cy.showWinningResult();
        cy.isHideWinningResultModal();
      });
    });

    it('로또 구매후 당첨 결과를 중복되게 입력된 경우 결과보기시 화면이 나타나지 않음', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isShowPurchaseHistory();
      cy.get('input.winning-number, input.bonus-number').then((els) => {
        let value = 1;
        [...els].forEach((el) => {
          cy.wrap(el).type(value++);
        });
        cy.showWinningResult();
        cy.isShowWinningResultModal();
      });
    });
  });
});
