const $purchaseInput = '[data-cy="purchase-amount"]';
const $priceCheckButton = '[data-cy="purchase-button"]';
const $purchaseButton = '.purchase-lotto-button';
const $lottoTickets = '[data-cy="lotto-tickets"]';
const $lottoNumbersToggleButton = '[data-cy="toggle-lotto-numbers"]';

const $LottoManuelNumbers = '.manuel-number';
const $lastLottoNumbers = '.winning-number';
const $lastBonusNumbers = '.bonus-number';
const $modalButton = '.open-stats-modal-button';

Cypress.Commands.add('typePriceInput', (price) => {
    cy.get($purchaseInput).type(price);
})

Cypress.Commands.add('clickPriceCheckButton', () => {
    cy.get($priceCheckButton).click();
})

Cypress.Commands.add('clickPurchaseButton', () => {
    cy.get($purchaseButton).click();
})

Cypress.Commands.add('typeLottoManuelNumbers', (numbers) => {
    numbers.forEach((number, i) => {
        cy.get($LottoManuelNumbers).eq(i).type(number);
        cy.get($LottoManuelNumbers).eq(i).tab();
    })
})

Cypress.Commands.add('clickLottoNumbersToggleButton', () => {
    return cy.get($lottoNumbersToggleButton).click();
})

Cypress.Commands.add('checkTicketUnit', (length) => {
    cy.get($lottoTickets).children('li').should('have.length', length);
})

Cypress.Commands.add('typeLastLottoNumbers', (numbers) => {
    numbers.forEach((number, i) => {
        cy.get($lastLottoNumbers).eq(i).type(number);
        cy.get($lastLottoNumbers).eq(i).tab();
    })
})

Cypress.Commands.add('typeLastLottoBonusNumbers', (number) => {
    cy.get($lastBonusNumbers).type(number);
})

Cypress.Commands.add('clickOpenResultModal', () => {
    return cy.get($modalButton).click();
})