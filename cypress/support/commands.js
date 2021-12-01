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

Cypress.Commands.add('submitPrice', (purchaseProcess, price) => {
  cy.get(`input[data-process='${purchaseProcess}']`).check();
  cy.get("#InputPurchaseAmount").type(price).as("input");
  cy.get("@input").next('button').click();
  cy.get("@input").clear();
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

Cypress.Commands.add('clearWinningNumber', () => {
  cy.get("#WinningNumberForm")
    .find("input[type='number']")
    .clear();
})

Cypress.Commands.add('inputManualNumber', ({mock2DManualNumbers, autoSelectRest = false}) => {
  cy.get(".lotto-manual-item[data-process='manual']").each(($item, i) => {
    cy.get($item).find("input[type='number']").each((input, j) => {
      if (!mock2DManualNumbers[i]) return;
      cy.get(input).type(mock2DManualNumbers[i][j]);
    })
  });

  if (autoSelectRest) cy.get(".auto-select-rest-checkbox").click({force: true});
  cy.get("#ManualLottoForm").submit();
})
