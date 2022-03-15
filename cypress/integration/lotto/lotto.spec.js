describe('로또 미션 Cypress', () => {
  before(() => {
    cy.visit('/');
  });

  context.only('START', () => {
    it('초기화면 상태 테스트', () => {
      cy.get('.price-form').should('be.visible');
      cy.get('.lotto-section').should('not.be.visible');
      cy.get('.lotto-form').should('not.be.visible');
    });
  });
});
