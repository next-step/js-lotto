describe('Lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });
  it('input amount & visible lottoList', () => {
    cy.get('#inputAmount').type('1000');
    cy.get('#amountBtn').click();
    cy.get('.lotto-numbers-toggle-button').click();
    cy.get('#lottoList').should('be.visible');
  })
  it('check winning numbers', () => {
    cy.get('.winning-number').each(($input) => {
      cy.wrap($input).type('12');
      cy.wrap($input).should('have.value', '12');
    });
  });

  it('check bonus number', () => {
    cy.get('.bonus-number').type('7');
    cy.get('.bonus-number').should('have.value', '7');
  });
  it('open the result modal', () => {
    cy.get('.winning-number').each(($input, index) => {
      cy.wrap($input).type(index + 1);
    });
    cy.get('.bonus-number').type('6');
    cy.get('.open-result-modal-button').click();
    cy.get('#myModal').should('be.visible');
  });
})