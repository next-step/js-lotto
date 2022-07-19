beforeEach(() => {
  cy.visit('/');
});

context('로또 구입 기능', () => {
  describe('로또는 천원단위로 구매 가능하다.', () => {
    it('5000원 입력한 후 확인을 누르면 5장의 로또를 자동 발급받는다.', () => {
      cy.buyLotto('5000');
      cy.get('#purchased-lotto').find('li').should('have.length', 5);
    });

    it('4500원 입력한 후 확인을 누르면 에러메시지를 확인한다.', () => {
      const alertStub = cy.stub();
      const ERROR_MESSAGE = '로또 구입 금액을 1,000원 단위로 입력해 주세요.';

      cy.on('window:alert', alertStub);
      cy.get('[name="paid-amount"]').type('4500');
      cy.get('#buy-lotto')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE);
        });
    });
  });

  describe('로또 번호를 확인한다.', () => {
    it('번호보기를 클릭하면 로또 번호가 보인다.', () => {
      cy.buyLotto('3000');
      cy.get('.lotto-numbers-toggle-button').check({ force: true });
      cy.get('.lotto-detail').should('be.visible');
    });

    it('번호보기를 두번 클릭하면 로또 번호가 사라진다.', () => {
      cy.buyLotto('3000');
      cy.get('.lotto-numbers-toggle-button').check({ force: true });
      cy.get('.lotto-detail').should('be.visible');
      cy.get('.lotto-numbers-toggle-button').uncheck({ force: true });
      cy.get('.lotto-detail').should('not.be.visible');
    });
  });
});

context('당첨 결과 기능', () => {
  describe('당첨 번호를 입력한 후 결과 확인하기 버튼을 클릭한다.', () => {
    it('같은 당첨 번호를 입력하면 에러메시지를 확인한다.', () => {
      const alertStub = cy.stub();
      const ERROR_MESSAGE = '로또 번호에는 중복된 숫자를 입력할 수 없습니다.';

      cy.on('window:alert', alertStub);
      cy.buyLotto('5000');
      cy.writeWinningNumber([1, 2, 3, 4, 5, 5], 7);

      cy.get('.open-result-modal-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE);
        });
    });

    it('당첨 개수를 확인한다.', () => {
      cy.buyLotto('5000');
      cy.writeWinningNumber([1, 2, 3, 4, 5, 6], 7);
      cy.get('.open-result-modal-button').click();

      cy.get('[data-cy="winning-ticket-count"]').each(($el) => {
        cy.wrap($el).then((el) => {
          const [count] = el.text().split('');
          expect(Number(count)).to.be.a('number');
        });
      });
    });

    it('수익률을 확인한다.', () => {
      cy.buyLotto('5000');
      cy.writeWinningNumber([1, 2, 3, 4, 5, 6], 7);
      cy.get('.open-result-modal-button').click();

      cy.get('#rate-of-return').then((el) => {
        expect(Number(el.text())).to.be.a('number');
      });
    });
  });

  describe('결과를 확인한 후 다시 시작하기 버튼을 클릭한다.', () => {
    it('input 내용들이 초기화된다.', () => {
      cy.buyLotto('5000');
      cy.writeWinningNumber([1, 2, 3, 4, 5, 6], 7);

      cy.get('.open-result-modal-button').click();
      cy.get('#reset').click();

      cy.get('#form-lotto-buying').find('input').should('have.value', '');
      cy.get('#result').find('input').should('have.value', '');
    });

    it('구매한 로또, 당첨 결과 화면이 안보인다.', () => {
      cy.buyLotto('5000');
      cy.writeWinningNumber([1, 2, 3, 4, 5, 6], 7);

      cy.get('.open-result-modal-button').click();
      cy.get('#reset').click();

      cy.get('#purchased-lotto-section, #result').should('not.be.visible');
    });
  });
});
