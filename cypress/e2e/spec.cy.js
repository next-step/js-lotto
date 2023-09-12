describe('Lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000'); // 앱의 URL로 이동
  });
  it('input amount & visible lottoList', () => {
    cy.get('#inputAmount').type('1000');
    cy.get('#amountBtn').click();
    cy.get('.lotto-numbers-toggle-button').click();
    cy.get('#lottoList').should('be.visible');
  })
  it('check winning numbers', () => {
    // 당첨 번호 입력 필드에 값을 입력하고 길이 제한을 확인
    cy.get('.winning-number').each(($input) => {
      cy.wrap($input).type('12');
      cy.wrap($input).should('have.value', '12');
    });
  });

  it('check bonus number', () => {
    // 보너스 번호 입력 필드에 값을 입력하고 길이 제한을 확인
    cy.get('.bonus-number').type('7');
    cy.get('.bonus-number').should('have.value', '7');
  });
  it('open the result modal', () => {
    // 당첨 번호와 보너스 번호 입력
    cy.get('.winning-number').each(($input, index) => {
      cy.wrap($input).type(index + 1);
    });
    cy.get('.bonus-number').type('6');

    // 결과 확인 버튼 클릭
    cy.get('.open-result-modal-button').click();

    // 모달 창이 열렸는지 확인
    cy.get('#myModal').should('be.visible');
  });
})