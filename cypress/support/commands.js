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

Cypress.Commands.add('submitPrice', (price) => {
  cy.get("#InputPurchaseAmount").type(price).as("input");
  cy.get("@input").next('button').click();
  cy.get("@input").clear();

  return cy.get("#PurchasedLottoList");
})

Cypress.Commands.add('getAmountMessage', () => {
  return cy.get(".purchased-lotto-message")
})

Cypress.Commands.add('getLottoList', () => {
  return cy.get(".purchased-lotto-list").find("li");
})

Cypress.Commands.add('inputWinningNumber', (mockWinningNumber) => {
  cy.get("#WinningNumberForm")
    .find("input[type='number']")
    .each(($el, i) => {
      if (i > mockWinningNumber.length - 1) return;
      cy.get($el).type(mockWinningNumber[i]);
      if (i === mockWinningNumber.length - 1) {
        cy.get($el).type("{enter}");
      }
    });
  cy.get("#WinningNumberForm").submit();
})