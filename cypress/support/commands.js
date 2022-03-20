Cypress.Commands.add('inputAmount', amount => {
  cy.get('[data-props="amount-input"]').type(amount);
  cy.get('[data-props="confirm-button"]').click();
});

Cypress.Commands.add('purchasedLottoList', () => {
  cy.get('.lotto-list').children();
});
