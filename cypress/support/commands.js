Cypress.Commands.add('priceInputAndClick', (price) => {
  cy.get('input[name="purchasePrice"]').type(price, { force: true }).get('#purchase-form > .d-flex > .btn').click();
});

Cypress.Commands.add('showToggleButtonClick', () => {
  cy.get('.text-base').click();
});

Cypress.Commands.add('resetButtonClick', () => {
  cy.get('#reset').click();
});

Cypress.Commands.add('submitWinningInputForm', () => {
  cy.priceInputAndClick(3000);
  for (let i = 1; i < 8; i++) {
    cy.get(`[data-order=${i}]`).type(i, { force: true });
  }
  cy.get('#lotto-winning-number-form').submit();
});

Cypress.Commands.add('onOccurAlert', (text) => {
  cy.on('window:alert', (alert) => expect(alert).to.contains(text));
});
