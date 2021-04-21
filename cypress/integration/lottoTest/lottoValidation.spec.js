describe('로또 금액 입력 예외 처리 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const price = 10000;

  function exceptionAlert(wrongPrice, alertMessage) {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('#input-price').type(wrongPrice);
    cy.get('#input-price-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(alertMessage);
      });
  }

  function winningNumberAlert(alertMessage) {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('#show-result-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(alertMessage);
      });
  }

  function checkInvalid(wrongPrice, errorMessage) {
    cy.get('#input-price').type(wrongPrice);
    cy.get('#input-price-btn').click();

    cy.get('#input-price:invalid').should('have.length', 1);
    cy.get('#input-price').then($input => {
      expect($input[0].validationMessage).to.eq(errorMessage);
    });
  }

  function clickAfterTypePrice() {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
  }

  it('로또 구입 금액은 최소 1,000원으로 제한한다.', () => {
    checkInvalid(200, '값은 1000 이상이어야 합니다.');

    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });

  it('로또 구입 금액은 최대 100,000원으로 제한한다.', () => {
    checkInvalid(120000, '값은 100000 이하여야 합니다.');

    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });

  it('로또 구입 금액은 1,000원 단위여야 한다.', () => {
    exceptionAlert(1200, '로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });

  it('로또 당첨 번호에는 중복된 숫자를 입력할 수 없다.', () => {
    clickAfterTypePrice();
    cy.get('.winning-number').each(winningNumber => {
      cy.wrap(winningNumber).type('7');
    });
    winningNumberAlert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
  });
});
