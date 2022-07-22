import { LOTTO } from '../../src/js/constants.js';

Cypress.Commands.add('submitPriceInputForm', (price) => {
  cy.get('input[name="purchasePrice"]').type(price, { force: true }).get('#purchase-form').submit();
});

Cypress.Commands.add('showToggleButtonClick', () => {
  cy.get('.text-base').click();
});

Cypress.Commands.add('clickResetButton', () => {
  cy.get('#reset').click();
});

Cypress.Commands.add('submitWinningInputForm', () => {
  cy.submitPriceInputForm(LOTTO.SUCCESS_TEST_PRICE);
  for (let i = 1; i < 8; i++) {
    cy.get(`[data-order=${i}]`).type(i, { force: true });
  }
  cy.get('#lotto-winning-number-form').submit();
});

Cypress.Commands.add('onOccurAlert', (text) => {
  cy.on('window:alert', (alert) => expect(alert).to.contains(text));
});
