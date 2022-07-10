context('로또 구입 기능', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
  });

  describe('로또는 천원단위로 구매 가능하다.', () => {
    it('5000원 입력한 후 확인을 누르면 5장의 로또를 자동 발급받는다.', () => {
      cy.get('#paid-amount').type('5000');
      cy.get('#buy-lotto').click();
      cy.get('#purchased-lotto').find('li').should('have.length', 5);
    });

    it('4500원 입력한 후 확인을 누르면 에러메시지를 확인한다.', () => {
      const alertStub = cy.stub();
      const ERROR_MESSAGE = '로또 구입 금액을 1,000원 단위로 입력해 주세요.';

      cy.on('window:alert', alertStub);
      cy.get('#paid-amount').type('4500');
      cy.get('#buy-lotto')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE);
        });
    });
  });

  describe('로또 번호를 확인한다.', () => {
    it('번호보기를 클릭하면 로또 번호가 보인다.', () => {
      cy.get('#paid-amount').type('3000');
      cy.get('#buy-lotto').click();
      cy.get('.lotto-numbers-toggle-button').check({ force: true });
      cy.get('.lotto-detail').should('be.visible');
    });

    it('번호보기를 두번 클릭하면 로또 번호가 사라진다.', () => {
      cy.get('#paid-amount').type('3000');
      cy.get('#buy-lotto').click();
      cy.get('.lotto-numbers-toggle-button').check({ force: true });
      cy.get('.lotto-detail').should('be.visible');
      cy.get('.lotto-numbers-toggle-button').uncheck({ force: true });
      cy.get('.lotto-detail').should('not.be.visible');
    });
  });
});
