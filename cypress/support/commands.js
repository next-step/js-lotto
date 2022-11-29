Cypress.Commands.add('typeInputPrice', (price) => {
  cy.get('#input-price').type(price);
});

Cypress.Commands.add('getInputPrice', (value) => {
  cy.get('#input-price').should('have.value', value);
});

Cypress.Commands.add('clickInputPriceButton', () => {
  cy.get('#input-price-btn').click();
});

Cypress.Commands.add('clickSwitchButton', () => {
  cy.get('.switch').click();
});

Cypress.Commands.add('getTotalPurchased', (total) => {
  cy.get('#total-purchased').should('have.text', total);
});

Cypress.Commands.add('getTotalLottoIcon', (total) => {
  cy.get('.lotto-icon').should('have.length', total);
});

Cypress.Commands.add('getLottoNumber', () => {
  cy.get('.lotto-detail');
});

Cypress.Commands.add('getPurchasedLottos', (show = true) => {
  cy.get('#purchased-lottos').should(show ? 'be.visible' : 'not.be.visible');
});

Cypress.Commands.add('typeWinningNumber', (index, value) => {
  cy.get(`#winning-lotto-numbers-form [name=${index}]`).type(value);
});

Cypress.Commands.add('clickShowResultButton', () => {
  cy.get('#show-result-btn').click();
});

Cypress.Commands.add('clickResetButton', () => {
  cy.get('#reset-btn').click();
});

Cypress.Commands.add('getModal', (show = true) => {
  cy.get('.modal').should(show ? 'be.visible' : 'be.not.visible');
});

Cypress.Commands.add('getProfit', () => {
  cy.get('#profit').should('be.visible');
});
