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

Cypress.Commands.add('purchaseLotto', (price) => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
});

Cypress.Commands.add('inputWinningNumbers', (numberList) => {
    let idx = 1;
    numberList.forEach((number) => {
        cy.get('#number' + idx).type(number);
        idx += 1;
    });
    cy.get('#show-result-btn').click();
});
