import { CLASS_NAME, INPUT_NAME } from "../../src/js/constants/selectors";

Cypress.Commands.add("submitPayment", (payment) => {
  cy.get(`input[name="${INPUT_NAME.PAYMENT_INPUT}"]`).type(payment);
  cy.get(CLASS_NAME.PAYMENT_FORM).submit();
});
