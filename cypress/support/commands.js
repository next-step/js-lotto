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
Cypress.Commands.add('purchaseInput', (number) => {
  cy.get('.purchase-input').type(number);
  cy.get('.btn-purchase').contains('확인').click();
});

Cypress.Commands.add('randomWinningNumberInput', (number) => {
  cy.get('.result-number').each(($ele) => {
    const random = Math.floor(Math.random() * number + 1);

    cy.get($ele).type(random);
  });
});

Cypress.Commands.add('inputWinningNumbers', (number) => {
  number.forEach((ele, idx) =>
    cy.get(`[data-cy="winning-num-${idx + 1}"]`).type(ele)
  );
});
