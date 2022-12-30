/// <reference types="cypress" />

describe('Lotto Ticket Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-price-input"]').find('input');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-price-input"]').find('button');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();

    const lottoAutoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-auto"]');
    lottoAutoPurchaseButton.click();
  });

  it('번호보기 토글버튼을 누르면 로또들의 번호가 옆에 표시된다.', () => {
    cy.get('#lotto-switch').parent().click();

    cy.get('[data-test-id="lotto-table"]').children().children().each((el) => {
      cy.wrap(el).children().should('have.length', 2);
      cy.wrap(el).children().get('.d-none').should('not.exist');
    });
  });
});
