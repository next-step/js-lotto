before(() => {
  cy.visit('/');
});

describe('로또 결과 확인 테스트', () => {
  describe('올바른 당첨 번호를 입력했는지 확인한다.', () => {
    before(() => cy.purchaseLotto(4000));

    it('로또를 구매시, 당첨번호를 입력할 수 있는 6개의 입력란과 1개의 보너스 입력란을 볼 수 있다.', () => {
      cy.get('.winning-number').should('have.lengthOf', 6);
      cy.get('.bonus-number').should('have.lengthOf', 1);
    });

    it('중복된 숫자를 입력할 경우, 구매 불가 알림창이 나온다.', () => {
      const winningNumbers = [12, 14, 35, 5, 28, 28, 40];
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputWinningNumbers(winningNumbers);
      cy.get('[data-cy="show-winning-result-modal"]')
        .click()
        .then(() => expect(alertStub).to.be.called);
      cy.clearWinningNumberInput();
    });
  });

  describe('당첨번호를 입력 후 결과 확인 창에서 결과를 볼 수 있다.', () => {
    before(() => {
      const winningNumbers = [23, 45, 18, 14, 29, 33, 7];
      cy.inputWinningNumbers(winningNumbers);
      cy.get('[data-cy="show-winning-result-modal"]').click();
    });

    it('결과 확인하기를 클릭시, 당첨 통계 창이 열린다.', () => {
      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('당첨 통계 창에서 당첨 갯수를 확인할 수 있다.', () => {
      cy.get('[data-cy="rank"]').each(($span) => {
        expect($span).not.to.be.empty;
        expect(Number($span.text())).to.match(/[0-9]/);
      });
    });

    it('당첨 통계 창에서 수익률을 확인할 수 있다.', () => {
      cy.get('[data-cy="earning-rate"]')
        .should('not.be.empty')
        .and(($span) => {
          expect(Number($span.text())).to.match(/[0-9]/);
        });
    });
  });

  describe('결과창을 닫거나 다시 시작할 수 있다.', () => {
    it('닫기 버튼을 클릭시, 초기화 되지 않고 창이 닫힌다.', () => {
      cy.get('.modal-close').click();

      cy.get('[data-cy="modal"]').should('not.be.visible');
      cy.get('.lotto-numbers').should('not.be.empty');
      cy.get('.winning-number').should('exist');
      cy.get('.bonus-number').should('exist');
    });

    it('다시 시작하기 클릭시, 초기화된다.', () => {
      cy.get('[data-cy="show-winning-result-modal"]').click();
      cy.get('[data-cy="reset"]').click();

      cy.get('[data-cy="modal"]').should('not.be.visible');
      cy.get('.lotto-numbers').should('not.exist');
      cy.get('.winning-number').should('be.empty');
      cy.get('.bonus-number').should('be.empty');
      cy.get('[data-cy="price-input"]').clear();
    });
  });
});
