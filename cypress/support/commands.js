import '@testing-library/cypress/add-commands';

Cypress.Commands.add('pay', (won) => {
  cy.findByPlaceholderText('구입 금액').type(won);
  cy.findByRole('button', { name: '확인' }).click();
});
