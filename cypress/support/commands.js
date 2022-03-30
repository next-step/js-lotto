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

import { CLASS } from "../../src/js/const/className.js";
import { MIN_MONEY_UNIT } from "../../src/js/const/constant.js";
import { buy } from "../../src/js/service/lotto.js";

Cypress.Commands.add("alert", (alertMessage) => {
  cy.on("window:alert", (msg) => expect(msg).to.equal(alertMessage));
});

Cypress.Commands.add("submitMoney", (money) => {
  cy.get(CLASS.MONEY_FORM).find(CLASS.MONEY).clear().type(money);
  cy.get(CLASS.MONEY_FORM).submit();
  return cy;
});

Cypress.Commands.add("issueLottos", () => {
  cy.get(CLASS.MONEY_FORM)
    .find(CLASS.MONEY)
    .invoke("val")
    .then((money) => {
      const amount = money / MIN_MONEY_UNIT;

      buy(money, {
        lotto: {
          numbers: [],
          count: 0,
        },
      });

      cy.get(CLASS.LOTTO_LIST).children().should("have.length", amount);
    });
});

Cypress.Commands.add("toggleNumbers", (checked) => {
  if (checked) {
    cy.get(CLASS.TOGGLE_NUMBERS).check({ force: true });
    cy.get(CLASS.LOTTO_LIST).then(($el) => {
      expect($el).to.have.class("flex-column");
    });
  } else {
    cy.get(CLASS.LOTTO_LIST).then(($el) => {
      expect($el).not.to.have.class("flex-column");
    });
  }
});
