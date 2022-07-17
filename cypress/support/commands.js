import '@testing-library/cypress/add-commands';

Cypress.Commands.add('pay', (won) => {
  cy.get('input[name=won]').type(won);
  cy.findByRole('button').click();
});

Cypress.Commands.add('submitWinningLotto', (winningNumbers, bonusNumber) => {
  cy.get('.winning-number').each((input, index) => {
    cy.wrap(input).type(winningNumbers[index]);
  });
  cy.get('.bonus-number').each((input) => {
    cy.wrap(input).type(bonusNumber);
  });

  cy.get('.open-result-modal-button').click();
});
