describe('로또 어플리케이션 단계1', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const $getPurchaseAmount = () => cy.get('[data-cy="purchase-amount"]');

  describe('로또 구입 금액을 입력한다.', () => {
    it('입력할 input 태그가 존재한다.', () => {
      $getPurchaseAmount().should('exist');
    });

    it('로또 구입 금액을 입력하면, 해당 금액이 input의 값으로 보여져야 한다.', () => {
      $getPurchaseAmount().type('1000');
      $getPurchaseAmount().should('have.value', '1000');
    });

    it('금액은 숫자만 입력이 가능하다.', () => {
      $getPurchaseAmount().type('1000a').should('have.value', '1000');
      $getPurchaseAmount().clear();
      $getPurchaseAmount().type('abc').should('have.value', '');
    });
  });
});
