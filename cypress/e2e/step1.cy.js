describe('로또 어플리케이션 단계1', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const $getPurchaseAmount = () => cy.get('[data-cy="purchase-amount"]');
  const $getPurchaseButton = () => cy.get('[data-cy="purchase-button"]');
  const $getPurchasedLottoList = () => cy.get('[data-cy="purchased-lotto-list"]');
  const $getWinningNumberInputs = () => cy.get('[data-cy="winning-number-inputs"]');
  const $getNoticeTotalQuantity = () => cy.get('[data-cy="notice-purchased-quantity"]');
  const $getTotalQuantity = () => cy.get('[data-cy="total-quantity"]');
  const $getLottoIconList = () => cy.get('[data-cy="lotto-icon-list"]');
  const $getLottoNumbersToggleButton = () => cy.get('[data-cy="lotto-numbers-toggle"');
  const $getLottoNumbers = () => cy.get('.lotto-numbers');

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

    it('로또 구입 시, 구매한 로또의 개수를 안내하는 문구와 함께 실제 구매한 개수를 문자로 화면에 표시한다.', () => {
      $getPurchaseAmount().type('3000');
      $getPurchaseButton().click();
      $getNoticeTotalQuantity().should('exist');
      $getTotalQuantity().should('text', '3');
    });

    it('로또 구입 시, 구매한 금액 만큼의 개수만큼 로또 아이콘이 화면에 나타난다.', () => {
      $getPurchaseAmount().type('3000');
      $getPurchaseButton().click();
      $getLottoIconList().find('.lotto-item').should('have.length', '3');
    });

    it('로또 구입 후, 금액을 바꾸어 다시 구입하는 경우, 새로 입력한 구매 금액만큼의 로또 아이콘이 화면에 나타난다.', () => {
      $getPurchaseAmount().type('3000');
      $getPurchaseButton().click();
      $getLottoIconList().find('.lotto-item').should('have.length', '3');
      $getPurchaseAmount().clear();
      $getPurchaseAmount().type('2000');
      $getPurchaseButton().click();
      $getLottoIconList().find('.lotto-item').should('have.length', '2');
    });

    it('번호보기 버튼을 누르면, 로또 아이콘이 일렬로 정렬된다.', () => {
      $getPurchaseAmount().type('3000');
      $getPurchaseButton().click();
      $getLottoNumbersToggleButton().click();
      $getLottoIconList().should('have.css', 'flex-direction', 'column');
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 하며, 번호보기 토글 버튼 클릭 시 번호를 볼 수 있다.', () => {
    it('번호보기 버튼을 누르면, 로또 아이콘의 옆에 6가지 서로 다른 번호가 나타나야 한다.', () => {
      $getPurchaseAmount().type('1000');
      $getPurchaseButton().click();
      $getLottoNumbers().should('have.css', 'display', 'none');
      $getLottoNumbersToggleButton().click();
      $getLottoNumbers().should('have.not.css', 'display', 'none');
      $getLottoNumbers().should(($numbers) => {
        const text = $numbers.text();
        const numArr = text.split(',');
        const tempSet = new Set();
        numArr.forEach((num) => tempSet.add(num));
        expect(tempSet.size).equal(6);
      });
    });

    it('로또 번호는 1-45의 범위 안에 존재한다.', () => {
      $getPurchaseAmount().type('1000');
      $getPurchaseButton().click();
      $getLottoNumbersToggleButton().click();
      $getLottoNumbers().should(($numbers) => {
        const text = $numbers.text();
        const numArr = text.split(',');
        const isValidNumber = numArr.every((num) => num < 46 && num > 1);
        expect(isValidNumber).to.be.true;
      });
    });

  });
});
