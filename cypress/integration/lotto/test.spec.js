describe('Create Lotto List', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  Cypress.Commands.add('input', (price) => {
    cy.get('.lotto-price-input').type(price);
  });

  Cypress.Commands.add('submit', () => {
    cy.get('form').contains('확인').click();
  });

  it('값 입력 안했을 때', () => {
    cy.submit();
  });

  it('최소 값 입력 했을 때', () => {
    cy.input(999);
    cy.submit();
  });

  it('최대 값 입력 했을 때', () => {
    cy.input(1000000);
    cy.submit();
  });

  it('로또 출력 및 토글 테스트', () => {
    cy.input(50000);
    cy.submit();

    cy.get('.lotto-numbers-toggle-button').click({ force: true });
    cy.get('.lotto-number-show').should('be.visible').should('not.have.class', 'hide');

    cy.get('.lotto-numbers-toggle-button').click({ force: true });
    cy.get('.lotto-number-show').should('not.be.visible').should('have.class', 'hide');
  });
});
