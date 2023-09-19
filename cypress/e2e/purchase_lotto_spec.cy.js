describe('로또 구매', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('로또 구매 금액을 입력하면 로또 티켓이 표시된다', () => {
    const purchaseAmount = 5000;
    cy.get('.test-purchase-input').type(purchaseAmount);
    cy.get('.test-ticket-form').submit();

    cy.get('.test-ticket-amount').should('contain', '총 5개를 구매하였습니다.');
    cy.get('.test-tickets').children().should('have.length', 5);
  });

  it('번호보기 토글을 클릭하면 로또 번호가 표시된다', () => {
    cy.get('.test-purchase-input').type(purchaseAmount);
    cy.get('.test-ticket-form').submit();
    cy.get('.lotto-numbers-toggle-button').check();
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('당첨 번호와 보너스 번호를 입력할 수 있다', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    winningNumbers.forEach((number, index) => {
      cy.get('.test-winning-number').eq(index).type(number);
    });

    cy.get('.test-bonus-number').type(bonusNumber);
  });
});
