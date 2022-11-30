/// <reference types="cypress" />

describe('Lotto Ticket Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase"]').get('input');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase"]').get('button');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();
  });

  it('번호보기 토글버튼을 누르면 로또들의 번호가 옆에 표시된다.', () => {
    const lottoNumberToggleButton = cy.get('[data-test-id="lotto-list"]').get('label');
    lottoNumberToggleButton.click();
    const lottoList = cy.get('[data-test-id="lotto-table"]').children().children();

    lottoList.each((el) => {
      cy.wrap(el).children().should('have.length', 2);
      cy.wrap(el).children().get('.d-none').should('not.exist');
    });
  });
});
