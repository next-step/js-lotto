Cypress.Commands.add('purchaseLotto', (number) => {
  cy.get('[data-cy="price-input"]').type(number);
  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add('clickToggle', () => {
  cy.get('.switch').click();
});
