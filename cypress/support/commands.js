import { DOM_ID } from '../../src/js/constants';

Cypress.Commands.add('clickElements', (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add('typeWinningNumbers', (numbers) => {
  numbers.forEach((number, index) => {
    cy.get(`#input-${index + 1}`).type(number);
  });
});

Cypress.Commands.add('typeBonusNumber', (number) => {
  cy.get(DOM_ID.BONUS_NUMBER).type(number);
});

Cypress.Commands.add('typeMoneyAndSubmit', (money) => {
  cy.get(DOM_ID.MONEY_INPUT).type(money);
  cy.get(DOM_ID.PURCHASE_BUTTON).click();
});

Cypress.Commands.add('checkChildLength', (selector, childLength) => {
  cy.get(selector).children().should('have.length', childLength);
});

Cypress.Commands.add('checkEqualityText', (selector, text) => {
  cy.get(selector).invoke('text').should('eq', text);
});

Cypress.Commands.add('typeText', (selector, text) => {
  cy.get(selector)
    .type(text);
});
Cypress.Commands.add('typeSelfGeneratedAmount', (amount) => {
  cy.window().then((p) => {
    cy.stub(p, 'prompt').returns(amount)
  })});

Cypress.Commands.add('typeSelfLottoNumber', (numbers) => {
  cy.get(DOM_ID.SELF_LOTTO_LIST).children().each(($el, index, $list) => {
    $el.children().each((index, $input) => {
      cy.wrap($input).type(numbers[index]);
    });
  });
});

