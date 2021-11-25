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

import * as SELECTOR from "../../src/js/constants/selector";
Cypress.Commands.add("typeInput", (type) => {
  cy.get(SELECTOR.PAYMENT).type(type);
});

Cypress.Commands.add("clickConfirmBtn", () => {
  cy.get(SELECTOR.CONFIRM_BTN).click();
});

Cypress.Commands.add("clickToggleBtn", () => {
  cy.get(SELECTOR.LOTTO_NUMBER_SWITCH).click({ force: true });
});

Cypress.Commands.add("clearInput", () => {
  cy.get(SELECTOR.PAYMENT).clear();
});
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
