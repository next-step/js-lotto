Cypress.Commands.add('shouldInvisible', (selector) => {
  cy.get(selector).should('not.be.visible');
});

Cypress.Commands.add('shouldVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

Cypress.Commands.add('shouldNotExist', (selector) => {
  cy.get(selector).should('not.exist');
});

Cypress.Commands.add('shouldExist', (selector) => {
  cy.get(selector).should('exist');
});
