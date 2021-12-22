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
Cypress.Commands.add('inputPrice', price => {
  cy.get('#purchaseForm input[type=number]').type(price);
});

Cypress.Commands.add('purchase', price => {
  cy.get('#purchaseForm').submit();
});

Cypress.Commands.add('getPurchaseQty', price => {
  cy.get('#lottoTickets').find('span');
});

Cypress.Commands.add("checkToggle", () => {
  cy.get(".lotto-numbers-toggle-button").check({ force: true });
});

Cypress.Commands.add("unCheckToggle", () => {
  cy.get(".lotto-numbers-toggle-button").uncheck({ force: true });
});
