context('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Initialization', () => {
    it('renders app', () => {
      cy.get('#app').should('exist');
    });

    it('should display header', () => {
      cy.contains('h1', '🎱 행운의 로또');
    });

    it('should display input form', () => {
      cy.contains('label', '구입할 금액을 입력해주세요.');
      cy.get('#purchase-amount')
        .should('exist')
        .invoke('attr', 'placeholder')
        .should('contain', '구입 금액');
      cy.get('#purchase-amount-submit').should('exist');
    });

    it('should not display purchased lottos section', () => {
      cy.get('#purchased-lottos').should('not.be.visible');
    });

    it('should not display last winning numbers form', () => {
      cy.get('#last-winning-numbers').should('not.be.visible');
    });

    it('should not display modal', () => {
      cy.get('.modal').should('not.be.visible');
    });
  });
});
