Cypress.Commands.add('purchaseLotto', (number) => {
  cy.get('#input-purchase-lotto').type(number);
  cy.get('#button-purchase-lotto').click();
});

Cypress.Commands.add('clickToggle', () => {
  cy.get('.switch').click();
});
