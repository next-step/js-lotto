import { SELECTOR } from '../../src/constants';

Cypress.Commands.add('purchaseLotto', (amount) => {
  cy.get(SELECTOR.TICKET.PURCHASE_AMOUNT_INPUT).type(amount);
  cy.get(SELECTOR.TICKET.FORM).submit();
});

Cypress.Commands.add('toggleLottoNumbers', () => {
  cy.get(SELECTOR.LOTTO.NUMBER_DISPLAY_TOGGLE_LABEL).click();
});

Cypress.Commands.add(
  'inputWinningNumbers',
  ({ winningNumbers, bonusNumber }) => {
    winningNumbers.forEach((number, index) => {
      cy.get(SELECTOR.LOTTO.WINNING_NUMBER).eq(index).type(number);
    });
    cy.get(SELECTOR.LOTTO.BONUS_NUMBER).type(bonusNumber);
  }
);

Cypress.Commands.add('submitWinningNumber', () => {
  cy.get(SELECTOR.MODAL.CHECK_TICKETS_RESULT).click();
});
