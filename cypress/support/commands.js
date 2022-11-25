Cypress.Commands.add('clickPurchaseBtn', (purchaseAmountInput) => {
  cy.get('.purchasing-lotto-input').type(purchaseAmountInput);
  cy.get('.purchasing-lotto-btn').click();
});
Cypress.Commands.add('pressEnter', (purchaseAmountInput) => {
  cy.get('.purchasing-lotto-input').type(`${purchaseAmountInput}{enter}`);
});
