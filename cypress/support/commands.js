// https://on.cypress.io/custom-commands
Cypress.Commands.add('inputValue', (selector, value) => {
  cy.get(selector).type(value);
});

Cypress.Commands.add('checkCss', (selector, style, value) => {
  cy.get(selector).should('have.css', style, value);
});

Cypress.Commands.add('clickButton', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('checkClassName', (selector, className) => {
  cy.get(selector).should('have.class', className);
});
