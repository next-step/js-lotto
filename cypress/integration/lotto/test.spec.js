describe('Create Lotto List', () => {
  it('Input Empty Test', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('form').contains('확인').click();
  });

  it('Input Min Test', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('.lotto-price-input').type('999');
    cy.get('form').contains('확인').click();
  });

  it('Input Max Test', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('.lotto-price-input').type('100000');
    cy.get('form').contains('확인').click();
  });

  it('Input Unit Test', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('.lotto-price-input').type('1001');
    cy.get('form').contains('확인').click();
  });

  it('Show Lotto List', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('.lotto-price-input').type('50000');
    cy.get('form').contains('확인').click();

    cy.get('.lotto-numbers-toggle-button').click({ force: true });
    cy.get('.lotto-number-show')
      .should('be.visible')
      .should('not.have.class', 'hide');

    cy.get('.lotto-numbers-toggle-button').click({ force: true });
    cy.get('.lotto-number-show')
      .should('not.be.visible')
      .should('have.class', 'hide');
  });
});
