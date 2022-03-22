// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('beforePurchaseView', () => {
  cy.get('.price-form').should('be.visible');
  cy.get('.lotto-section').should('not.be.visible');
  cy.get('.lotto-form').should('not.be.visible');
});

Cypress.Commands.add('afterPurchaseView', () => {
  cy.get('.price-form').should('be.visible');
  cy.get('.lotto-section').should('be.visible');
  cy.get('.lotto-form').should('be.visible');
});

Cypress.Commands.add('makeAlias', () => {
  cy.get('.price-form').find('.price-form__input').as('priceInput');
  cy.get('.price-form').find('.price-form__button').as('purchaseButton');
});

Cypress.Commands.add('typePrice', (price) => {
  cy.get('@priceInput').type(price);
});

Cypress.Commands.add('purchaseLotto', (price) => {
  cy.get('@priceInput').type(price).type('{enter}');
});

Cypress.Commands.add('testProperMessage', (message) => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(message);
  });
});

Cypress.Commands.add('testToggle', (testExpectedStatus) => {
  cy.get('.lotto-numbers-toggle__label').click();
  cy.get('.lotto-section__ticket__numbers').each(($span) => {
    testExpectedStatus($span);
  });
});

