Cypress.Commands.add('priceInputAndClick', (price) => {
  cy.get('input[name="purchasePrice"]').type(price, { force: true }).get('#purchase-form > .d-flex > .btn').click();
});

Cypress.Commands.add('showToggleButtonClick', () => {
  cy.get('.text-base').click();
});

Cypress.Commands.add('onOccurAlert', (text) => {
  cy.on('window:alert', (alert) => expect(alert).to.contains(text));
});
