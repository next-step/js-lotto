Cypress.Commands.add('purchaseLottos', (amount) => {
  cy.get('.input-price').type(amount);
  cy.get('.input-price-form').submit();
});

Cypress.Commands.add('clickToggle', () => {
  cy.get('.switch').click();
});

Cypress.Commands.add('clickResultButton', () => {
  cy.get('.show-result-btn').click();
});

Cypress.Commands.add(
  'inputWinningNumbers',
  ({ winningNumbers, bonusNumber }) => {
    winningNumbers.forEach((winningNum, index) => {
      cy.get('.winning-number').eq(index).type(winningNum);
    });

    cy.get('.bonus-number').type(bonusNumber);
  }
);

Cypress.Commands.add('clickRestartButton', () => {
  cy.get('.restart-btn').click();
});
