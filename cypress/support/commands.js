Cypress.Commands.add('inputAmount', amount => {
  cy.get('[data-props="amount-input"]').type(amount);
  cy.get('[data-props="confirm-button"]').click();
});

Cypress.Commands.add('purchasedLottoList', () => {
  cy.get('.lotto-list').children();
});

Cypress.Commands.add('checkLottoNumbers', () => {
  cy.get('[data-props="modal-open-button"]').click();
});

Cypress.Commands.add('inputWinningNumbers', winningNumbers => {
  winningNumbers.forEach((winningNumber, index) => {
    cy.get('.winning-number').eq(index).type(winningNumber);
  });
});
