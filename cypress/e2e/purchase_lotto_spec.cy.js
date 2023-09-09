describe('로또 구매', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000'); // 로컬 서버 주소
  });

  it('로또 구매 금액을 입력하면 로또 티켓이 표시된다', () => {
    const purchaseAmount = 5000;

    cy.get('.test-purchase-input').type(purchaseAmount);
    cy.get('.test-ticket-form').submit();

    cy.get('.test-ticket-amount').should('contain', '총 5개를 구매하였습니다.'); // 로또 티켓 가격을 1000원으로 가정
    cy.get('.test-tickets').children().should('have.length', 5);
  });

  it('번호보기 토글을 클릭하면 로또 번호가 표시된다', () => {
    // 이 부분에 로또 구매 과정 추가

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

  // 결과 확인하기 버튼을 클릭하는 테스트나 다른 기능들에 대한 테스트도 추가 가능
});
