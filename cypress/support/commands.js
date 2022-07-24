Cypress.Commands.add('purchaseLotto', (number) => {
  cy.get('[data-cy="price-input"]').type(number);
  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add('clickToggle', () => {
  cy.get('.switch').click();
});

Cypress.Commands.add('inputWinningNumbers', (inputWinningNumbers) => {
  inputWinningNumbers.forEach((number, index) => cy.get(`[data-cy="winning-num-${index}"]`).type(number));
});

Cypress.Commands.add('clearWinningNumberInput', () => {
  Array.from({ length: 7 }).forEach((_, index) => cy.get(`[data-cy="winning-num-${index}"]`).clear());
});
