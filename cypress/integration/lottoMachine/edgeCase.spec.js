import { ERROR_MESSAGES } from '../../../src/common/constants.js';

describe('로또 발급 엣지 케이스', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  context('로또 금액 입력', () => {
    it('javascript Form Validation', () => {
      const alertStub = cy.stub();

      cy.on('window:alert', alertStub);
      cy.getInputPrice().type(1001).should('have.value', 1001);
      cy.getInputPriceForm()
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.priceForm.INVALID_PRICE_UNIT);
        });
    });

    it('Build-in Form Validation', () => {
      cy.getInputPriceForm().within(() => {
        cy.getInputPrice().invoke('prop', 'validationMessage').should('equal', ERROR_MESSAGES.priceForm.VALUE_MISSING);
        cy.getInputPrice().type(100);
        cy.getInputPrice()
          .invoke('prop', 'validationMessage')
          .should('equal', ERROR_MESSAGES.priceForm.RANGE_UNDERFLOW);
        cy.getInputPrice().clear().type(1000000);
        cy.getInputPrice().invoke('prop', 'validationMessage').should('equal', ERROR_MESSAGES.priceForm.RANGE_OVERFLOW);
      });
    });
  });
});
