Cypress.Commands.add('getInputPrice', (price) => {
  cy.get('#input-price').type(price);
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

Cypress.Commands.add('getPurchasedLottos', () => {
  cy.get('#purchased-lottos').should('be.visible');
});

Cypress.Commands.add('typeWinningNumber', (index, value) => {
  cy.get(`#winning-lotto-numbers-form [name=${index}]`).type(value);
});

Cypress.Commands.add('clickShowResultButton', () => {
  cy.get('#show-result-btn').click();
});
