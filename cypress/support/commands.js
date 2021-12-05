// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("inputPrice", (price) => {
  cy.get('#LottoForm input[type="number"]').type(price);
  cy.get("#LottoForm form").submit();
});

Cypress.Commands.add("checkToggle", () => {
  cy.get(".lotto-numbers-toggle-button").check({ force: true });
});

Cypress.Commands.add("unCheckToggle", () => {
  cy.get(".lotto-numbers-toggle-button").uncheck({ force: true });
});

Cypress.Commands.add("clickRetry", () => {
  cy.get("#retry-btn").click();
});

Cypress.Commands.add("checkResult", () => {
  cy.get(".open-result-modal-button").click();
});

Cypress.Commands.add("inputWinningNumbers", ({ winningNumbers = [], bonusNumber = "" }) => {
  cy.get(".winning-number").each((el, index) => {
    console.log("winningNumbers[index]", winningNumbers[index]);
    cy.get(el).type(winningNumbers[index]);
  });

  cy.get(".bonus-number").type(bonusNumber);
});
