describe('로또 사이트 E2E 테스트', () => {
  it('페이지 정상 렌더링 확인', () => {
    cy.visit('../../index.html');
    cy.contains('h1', '🎱 행운의 로또');
  });
});
