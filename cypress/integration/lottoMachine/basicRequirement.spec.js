describe('lotto machine basic requirement', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  context('로또 정상 발급 시도', () => {
    it('로또를 한 장 발급한다.', () => {
      /**
       * 로또 구매 금액을 입력하고 로또 발급을 신청한다.
       * - 금액 창을 가져와 1000원을 입력한다.
       * - 발급 버튼을 누른다.
       */
      cy.getInputPrice().type(1000).should('have.value', 1000);

      cy.getInputPriceForm().then(($inputPriceForm) => {
        $inputPriceForm.on('submit', (e) => {
          e.preventDefault();
        });
      });

      /**
       * 로또가 발급된다.
       * - 발매된 로또 리스트가 보인다.
       * - 로또 티켓 이미지만 보인다.
       */
      cy.getLottos().should('be.visible');
      cy.getLottos().children('.lotto-icon').should('be.visible');
      cy.getLottos().children('.lotto-detail').should('not.be.visible');

      /**
       * 로또 번호를 확인할 수 있다.
       * - 번호보기 토글버튼이 보인다.
       * - 번호보기 토글버튼을 누른다.
       * - 로또 티켓 이미지가 보인다.
       * - 로또 티켓 번호가 보인다.
       */
      cy.getLottoSwitchToggle().check().should('be.checked');
      cy.getLottos().children('.lotto-icon').should('be.visible');
      cy.getLottos().children('.lotto.detail').should('be.visible');

      /**
       * 로또 번호를 다시 숨길 수 있다.
       * - 번호보기 토글이 보인다.
       * - 번호보기 토글버튼을 누른다.
       * - 로또 티켓 이미지만 보인다.
       * - 로또 티켓 번호는 보이지 않는다.
       */
      cy.getLottoSwitchToggle().check().should('not.be.checked');
      cy.getLottos().children('.lotto-icon').should('be.visible');
      cy.getLottos().children('.lotto.detail').should('be.visible');
    });
  });
});
