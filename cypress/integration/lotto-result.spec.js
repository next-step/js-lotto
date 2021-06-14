describe('lotto 당첨 결과 기능', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');

        //given
        const amount = 2000;

        cy.getBySel('amount-input')
          .type(amount);
        cy.getBySel('amount-submit-button')
          .click();

        cy.getBySel('winning-number-form')
          .within(() => {
              cy.get('input')
                .each(($el, index) => {
                    cy.wrap($el)
                      .type(index + 1);
                });
          });
    });

    it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
        //when
        cy.getBySel('winning-number-submit-button')
          .click();

        //then
        cy.getBySel('result-modal-wrapper')
          .should('be.visible');
    });

    it('닫기 버튼을 누르면 모달이 닫힌다.', () => {
        //given
        cy.getBySel('winning-number-submit-button')
          .click();

        //when
        cy.getBySel('result-modal-close-button')
          .click();

        //then
        cy.getBySel('result-modal-wrapper')
          .should('not.exist');
    });

    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
        //given
        cy.getBySel('winning-number-submit-button')
          .click();

        //when
        cy.getBySel('result-modal-restart-button')
          .click();

        //then
        cy.getBySel('amount-input')
          .should('not.have.value');
        cy.getBySel('winning-number-form')
          .should('not.exist');
    });
});
