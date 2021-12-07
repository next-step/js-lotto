import { CLASS_NAME, INPUT_NAME } from "../../src/js/constants/selectors";

Cypress.Commands.add("submitPayment", (payment) => {
  cy.get(`input[name="${INPUT_NAME.PAYMENT_INPUT}"]`).type(payment);
  cy.get(CLASS_NAME.PAYMENT_FORM).submit();
});

Cypress.Commands.add("submitWinningNumber", (winningNumbers, bonusNumber) => {
  cy.get(CLASS_NAME.WINNING_NUMBER_FORM).then(($form) => {
    cy.wrap($form)
      .get(`input[name="${INPUT_NAME.WINNING_NUMBER}"]`)
      .each(($winningNumber, index) => {
        winningNumbers[index] && cy.wrap($winningNumber).type(winningNumbers[index]);
      });
    cy.get(`input[name="${INPUT_NAME.BONUS_NUMBER}"]`).type(bonusNumber);
  });
});
