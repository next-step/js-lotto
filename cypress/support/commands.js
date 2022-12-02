Cypress.Commands.add('clickPurchaseBtn', (purchaseAmountInput) => {
  cy.get('.purchasing-lotto-input').type(purchaseAmountInput);
  cy.get('.purchasing-lotto-btn').click();
});
Cypress.Commands.add('pressEnter', (purchaseAmountInput) => {
  cy.get('.purchasing-lotto-input').type(`${purchaseAmountInput}{enter}`);
});
Cypress.Commands.add('typeWinningNumbersAndBonus', ({ winningNumbers, bonus }) => {
  cy.get('.winning-number').each(($ele, idx) => {
    cy.get($ele).type(winningNumbers[idx]);
  });
  cy.get('.bonus-number').type(bonus);
});
