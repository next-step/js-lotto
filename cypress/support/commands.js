Cypress.Commands.add('clickBuy', () => {
  cy.get('.buy-lotto-button').click();
});
Cypress.Commands.add('typeMoney', (money) => {
  cy.get('.money-input').type(money);
});
Cypress.Commands.add('buyLotto', (n) => {
  cy.typeMoney(n * 1000);
  cy.clickBuy();
});
Cypress.Commands.add('clickToggle', () => {
  cy.get('.lotto-numbers-toggle-button').click({ force: true });
});
Cypress.Commands.add('typeWinningNumbers', (winningNumbers, bonusNumber) => {
  cy.get('.winning-number').each((item, index) => {
    cy.wrap(item).type(winningNumbers[index]);
  });
  cy.get('.bonus-number').type(bonusNumber);
});
Cypress.Commands.add('clickResult', () => {
  cy.get('.open-result-modal-button').click();
});
Cypress.Commands.add('clickReset', () => {
  cy.get('#reset-button').click();
});
