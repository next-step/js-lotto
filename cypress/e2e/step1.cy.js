describe('로또 어플리케이션 단계1', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const $getPurchaseAmount = () => cy.get('[data-cy="purchase-amount"]');
  const $getPurchaseButton = () => cy.get('[data-cy="purchase-button"]');
  const $getPurchasedLottoList = () => cy.get('[data-cy="purchased-lotto-list"]');
  const $getWinningNumberInputs = () => cy.get('[data-cy="winning-number-inputs"]');

  describe('로또 구입 금액을 입력한다.', () => {
    it('입력할 input 태그가 존재한다.', () => {
      $getPurchaseAmount().should('exist');
    });

    it('로또 구입 금액을 입력하면, 해당 금액이 input의 값으로 보여져야 한다.', () => {
      $getPurchaseAmount().type('1000');
      $getPurchaseAmount().should('have.value', '1000');
    });

    it('금액은 숫자만 입력이 가능하다.', () => {
      $getPurchaseAmount().type('1000a').should('have.value', '1000');
      $getPurchaseAmount().clear();
      $getPurchaseAmount().type('abc').should('have.value', '');
    });
  });

  describe('금액에 해당하는 로또를 발급해야 하며, 로또는 한 장에 1000원이다.', () => {
    it(`구매에 필요한 '확인'버튼이 존재한다.`, () => {
      $getPurchaseButton().should('exist');
    });

    it(`'확인'버튼을 클릭할 수 있어야 한다.`, () => {
      $getPurchaseButton().click();
    });

    it(`구매금액 미입력 후 '확인'버튼을 누르면, alert로 '반드시 값을 입력해주세요!' 라는 메세지가 나타난다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      $getPurchaseButton()
        .click()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal('반드시 값을 입력해주세요!');
        });
    });

    it(`구매금액에 1000단위가 아닌 값을 입력후 '확인'버튼을 누르면, alert로 '로또 한 장의 단위는 1000원 입니다.' 라는 메세지가 나타난다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      const invalidInputValues = ['999', '100', '1001', '-1000'];
      invalidInputValues.forEach((value, idx) => {
        $getPurchaseAmount().type(value);
        $getPurchaseButton()
          .click()
          .then(() => {
            const actualMessage = alertStub.getCall(0).lastArg;
            expect(actualMessage).to.equal('로또 한 장의 단위는 1000원 입니다.');
            if (idx < invalidInputValues.length) {
              $getPurchaseAmount().clear();
            }
          });
      });
    });

    it('로또 발급 전에는 구매금액 입력 폼을 제외하고 다른 요소들은 보이지 않는다.', () => {
      $getPurchasedLottoList().should('have.css', 'display', 'none');
      $getWinningNumberInputs().should('have.css', 'display', 'none');
    });

    it('로또 구입시, 구매한 로또의 정보를 나타내는 섹션과, 당첨번호 입력 폼이 나타난다.', () => {
      $getPurchaseAmount().type('1000');
      $getPurchaseButton().click();
      $getPurchasedLottoList().should('not.have.css', 'display', 'none');
      $getWinningNumberInputs().should('not.have.css', 'display', 'none');
    });
  });
});
