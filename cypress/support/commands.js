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
Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('purchaseTickets', (amount) => {
    cy.getBySel('amount-input').type(amount);
    return cy.getBySel('amount-form').submit();
});

Cypress.Commands.add('typeWinningNumbers', ({normalNumbers, bonusNumber}) => {
    const numbers = [...normalNumbers, bonusNumber];
    return cy.get('[data-winning-number]').each(($input, index) => cy.wrap($input).type(numbers[index]));
});

Cypress.Commands.add('confirmLottoResult', () => {
    return cy.contains('결과 확인하기').click();
});

Cypress.Commands.add('restartLotto', () => {
    return cy.contains('다시 시작하기').click();
})
