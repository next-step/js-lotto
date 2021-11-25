describe('Lotto 결과 확인', () => {
    beforeEach(() => {
        cy.visit('localhost:8080');
    });

    it('당첨번호와 보너스번호에 중복된 번호가 있는경우 alert 표시된다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.purchaseTickets(1000);

        cy.typeWinningNumbers({normalNumbers: [1, 1, 1, 1, 1, 1], bonusNumber: 1});

        cy.confirmLottoResult()
          .then(() => {
              expect(stub.getCall(0))
                  .to
                  .be
                  .calledWith('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
          });
    });

    it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
        cy.purchaseTickets(1000);
        cy.typeWinningNumbers({normalNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7});

        cy.confirmLottoResult();

        cy.contains('당첨 통계').should('be.visible');
    });

    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
        cy.purchaseTickets(1000);
        cy.typeWinningNumbers({normalNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7});

        cy.confirmLottoResult();

        cy.restartLotto()
          .then(() => {
              cy.getBySel('amount-input').should('be.empty');
              cy.contains('당첨 통계').should('not.exist');
          });
    });
});
