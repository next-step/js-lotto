import { CHARGE_BUTTON, CHARGE_INPUT } from "../../src/js/utils/selectors";

Cypress.Commands.add("buyLotto", (charge) => {
  cy.get(CHARGE_INPUT).type(charge);
  cy.get(CHARGE_BUTTON).click();
});
