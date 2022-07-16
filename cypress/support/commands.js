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
