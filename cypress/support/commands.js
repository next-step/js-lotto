Cypress.Commands.add('buyLotto', (payment) => {
  cy.get('[name="paid-amount"]').type(payment);
  cy.get('#buy-lotto').click();
});

Cypress.Commands.add('writeWinningNumber', (winningNumbers, bonusNumber) => {
  cy.get('[data-cy="result-inputs"] > input').each(($el, index) => {
    cy.wrap($el).type(winningNumbers[index]);
  });

  cy.get('[name="bonus-number"]').type(bonusNumber);
});
