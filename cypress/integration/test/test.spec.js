describe('행운의 로또 테스트', () => {
  const clickBuyBtn = () => cy.get('.buy-lotto-button').click();

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('확인 버튼을', () => {
    it('누르기 전엔 구매 내역이 뜨지 않는다.', () => {
      cy.get('.lotto-detail').should('not.exist');
    });
    it('누르고 나면 구매 내역이 뜬다.', () => {
      clickBuyBtn();
      cy.get('.lotto-detail').should('be.visible');
    });
  });
});
