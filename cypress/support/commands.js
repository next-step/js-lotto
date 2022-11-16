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

Cypress.Commands.add('getTotalLottoNumber', (total) => {
  cy.get('.lotto-detail').should('have.length', total);
});
