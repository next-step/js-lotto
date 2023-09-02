/// <reference types="cypress" />
import { CYPRESS_SELECTOR } from '@step4/constants/cypressSelector';

Cypress.Commands.add('buyLotto', (price: string) => {
  // given
  cy.get(CYPRESS_SELECTOR.INPUT_PRICE.INPUT).type(price);
  // when
  cy.get(CYPRESS_SELECTOR.INPUT_PRICE.FORM).submit();
});

Cypress.Commands.add('checkLottoNumbers', () => {
  // given
  const numbers = [1, 2, 3, 4, 5, 6];

  // when
  cy.buyLotto('1000');
  cy.get(CYPRESS_SELECTOR.WINNING_LOTTO_INFO.WINNING_NUMBER_INPUT).each(($input, index) => {
    cy.wrap($input).type(`${numbers[index]}`);
  });
  cy.get(CYPRESS_SELECTOR.WINNING_LOTTO_INFO.BONUS_NUMBER_INPUT).type('7');
  cy.get(CYPRESS_SELECTOR.WINNING_LOTTO_INFO.FORM).submit();
});

Cypress.Commands.add('isInitApp', () => {
  // then
  cy.get(CYPRESS_SELECTOR.INPUT_PRICE.FORM).should('be.visible');
  cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTOS_SECTION).should('not.be.visible');
  cy.get(CYPRESS_SELECTOR.WINNING_LOTTO_INFO.FORM).should('not.be.visible');
  cy.get(CYPRESS_SELECTOR.WINNING_INFO.MODAL).should('not.be.visible');
});

Cypress.Commands.add('forceClickLottoToggleButton', () => {
  cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTOS_TOGGLE_BUTTON).check({ force: true });
});
