context('purchase result', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('purchases by amount', () => {
    it('should display lotto icons', () => {
      cy.get('#purchase-amount').type('3000');
      cy.get('#purchase-amount-submit').click();
      cy.get('#purchased-lottos').should('be.visible');
      cy.get('#purchased-lottos').find('.lotto-icon').should('have.length', 3);
    });

    it('should toggle', () => {
      cy.get('#purchase-amount').type('3000');
      cy.get('#purchase-amount-submit').click();
      cy.get('.lotto-detail').should('not.be.visible');

      cy.get('.switch').click();
      cy.get('.lotto-detail').should('be.visible');
      cy.get('.lotto-detail').should('have.length', 3);

      cy.get('.switch').click();
      cy.get('.lotto-detail').should('not.be.visible');
    });
  });
});
