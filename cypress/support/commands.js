export const purchaseInputSelector = '#purchase-amount-input';
export const purchaseButtonSelector = '[data-cy="purchase-button"]';
export const lottoIconSelector = '[data-cy="lotto-icon"]';
export const lottoAnnouncementSelector = '[data-cy="lotto-announcement"]';
export const winningLotteryNumberSelector = '.winning-number';
export const winningLotteryBonusSelector = '.bonus-number';

Cypress.Commands.add('purchaseLotto', (count) => {
 cy.get(purchaseInputSelector).type(count * 1000);
 cy.get(purchaseButtonSelector).click();
});

Cypress.Commands.add('setWinningLotto', (numbers, bonus) => {
 cy.get('.winning-number').each((e, index) => {
  cy.wrap(e).type(numbers[index]);
 });
 cy.get('.bonus-number').type(bonus).focus();
});
