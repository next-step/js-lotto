describe('lotto', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('http://localhost:5500/');
  });

  describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다. (장당 가격 1000원)', () => {
    it('5000원 입력 시 5개의 로또를 발급받는다.', () => {
      cy.inputPrice(5000);
      cy.get('#total-purchased').should('have.text', 5);
    });

    it('5500원 입력 시 5개의 로또를 발급받는다.', () => {
      cy.inputPrice(5500);
      cy.get('#total-purchased').should('have.text', 5);
    });
  });
});
