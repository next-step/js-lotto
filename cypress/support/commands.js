// https://on.cypress.io/custom-commands
Cypress.Commands.add('inputValue', (selector, value) => {
  cy.get(selector).type(value);
});

Cypress.Commands.add('checkCss', (selector, style, value, type = true) => {
  const haveCss = type ? 'have.css' : 'have.not.css';
  cy.get(selector).should(haveCss, style, value);
});

Cypress.Commands.add('clickButton', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('checkClassName', (selector, className, type = true) => {
  const haveClass = type ? 'have.class' : 'have.not.class';
  cy.get(selector).should(haveClass, className);
});
