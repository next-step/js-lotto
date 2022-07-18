import { CHARGE_BUTTON, CHARGE_INPUT, NUMBER_VISIBILITY_TOGGLE } from "../../src/js/utils/selectors";

Cypress.Commands.add("buyLotto", (charge) => {
  cy.get(CHARGE_INPUT).type(charge);
  cy.get(CHARGE_BUTTON).click();
});

Cypress.Commands.add("toggleViewLotto", () => {
  cy.get(`${NUMBER_VISIBILITY_TOGGLE} input[type=checkbox]`).click({ force: true });
});
