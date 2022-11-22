Cypress.Commands.add('getByDataCy', (dataCy) => {
  cy.get(`[data-cy="${dataCy}"]`);
});
Cypress.Commands.add('clickPurchaseBtn', (purchaseAmountInput) => {
  cy.getByDataCy('lotto-purchase-input').type(purchaseAmountInput);
  cy.getByDataCy('lotto-purchase-btn').click();
});
Cypress.Commands.add('pressEnter', (purchaseAmountInput) => {
  cy.getByDataCy('lotto-purchase-input').type(`${purchaseAmountInput}{enter}`);
});
