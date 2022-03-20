describe('로또 구매 시', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('구매 전에는 발급된 로또 영역이 노출되지 않는다.', () => {
    cy.get('.lotto-list').should('not.visible');
  });

  it('구매 전에는 결과 확인하기 입력 폼 영역이 노출되지 않는다.', () => {
    cy.get('.lotto-result-confirm-form').should('not.visible');
  });
});
