import '@testing-library/cypress/add-commands';

Cypress.Commands.add('pay', (won) => {
  cy.get('input[name=won]').type(won);
  cy.findByRole('button').click();
});
