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

const purchaseButton = "[data-cy='purchase-button']";

Cypress.Commands.add("alertMessage", (message) => {
  const alertStub = cy.stub();
  cy.on("window:alert", alertStub);

  cy.get(purchaseButton)
    .click()
    .then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(message);
    });
});
