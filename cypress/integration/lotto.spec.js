const BASE_URL = 'http://127.0.0.1:5500';

before(() => {
  cy.visit(BASE_URL);
});

describe('로또 게임', () => {
  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 구입해야 한다.', () => {
    cy.get('.js-payment-input').type(5000);
    cy.get('.js-confirm-button').click();
    cy.get('.js-lotto-count').should('have.text', '5');
    cy.get('.js-lotto-ticket').should('have.length', 5);
  });
});
