describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:9000');

    cy.get('#inputAmount').type('1000');
    cy.get('#amountBtn').click();
    cy.get('.lotto-numbers-toggle-button').click();
    cy.get('#lottoList').should('be.visible');
  })
})