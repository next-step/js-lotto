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
    });

    it('금액 지불후 구매한 로또 갯수', () => {
      cy.inputMoney(3000);
      cy.purchase();
      cy.isEqualLottoAmount(3);
    });
  });
});
