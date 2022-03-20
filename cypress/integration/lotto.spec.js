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

  it('구매 금액이 1,000원 단위가 아닌 경우 사용자 경고 메세지를 출력한다.', () => {
    cy.get('.lotto-buy-form-input').type('1108');
    cy.get('.lotto-buy-form-submit').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('로또 구입 금액은 1,000원 단위로 입력해주세요.');
    });
  });
});
