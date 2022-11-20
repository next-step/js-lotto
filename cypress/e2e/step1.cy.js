import {
  LOTTO_LENGTH,
  LOTTO_NUMBER_RANGE_MAX,
  LOTTO_NUMBER_RANGE_MIN,
  LOTTO_PURCHASE_UNIT,
  MESSAGE_FOR_EMPTY_VALUE,
  MESSAGE_FOR_INVALID_UNIT_VALUE,
} from '../../src/js/constants.js';
import { isAlreadyExist } from '../../src/js/validators.js';

describe('로또 어플리케이션 단계1', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const getPurchaseAmount = () => cy.get('[data-cy="purchase-amount"]');
  const getPurchaseButton = () => cy.get('[data-cy="purchase-button"]');
  const getPurchasedLottoList = () => cy.get('[data-cy="purchased-lotto-list"]');
  const getWinningNumberInputs = () => cy.get('[data-cy="winning-number-inputs"]');
  const getNoticeTotalQuantity = () => cy.get('[data-cy="notice-purchased-quantity"]');
  const getTotalQuantity = () => cy.get('[data-cy="total-quantity"]');
  const getLottoIconList = () => cy.get('[data-cy="lotto-icon-list"]');
  const getLottoNumbersToggleButton = () => cy.get('[data-cy="lotto-numbers-toggle"');
  const getLottoNumbers = () => cy.get('.lotto-numbers');

  const purchaseLottos = (amount = LOTTO_PURCHASE_UNIT) => {
    getPurchaseAmount().type(`${amount}`);
    getPurchaseButton().click();
  };

  describe('로또 구입 금액을 입력한다.', () => {
    it('입력할 input 태그가 존재한다.', () => {
      getPurchaseAmount().should('exist');
    });

    it('로또 구입 금액을 입력하면, 해당 금액이 input의 값으로 보여져야 한다.', () => {
      getPurchaseAmount().type('1000');
      getPurchaseAmount().should('have.value', '1000');
    });

    it('금액은 숫자만 입력이 가능하다.', () => {
      getPurchaseAmount().type('1000a').should('have.value', '1000');
      getPurchaseAmount().clear();
      getPurchaseAmount().type('abc').should('have.value', '');
    });
  });

  describe('금액에 해당하는 로또를 발급해야 하며, 로또는 한 장에 1000원이다.', () => {
    it(`구매에 필요한 '확인'버튼이 존재한다.`, () => {
      getPurchaseButton().should('exist');
    });

    it(`'확인'버튼을 클릭할 수 있어야 한다.`, () => {
      getPurchaseButton().click();
    });

    it(`구매금액 미입력 후 '확인'버튼을 누르면, alert로 '${MESSAGE_FOR_EMPTY_VALUE}' 라는 메세지가 나타난다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      getPurchaseButton()
        .click()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(MESSAGE_FOR_EMPTY_VALUE);
        });
    });

    it(`구매금액에 1000단위가 아닌 값을 입력후 '확인'버튼을 누르면, alert로 '${MESSAGE_FOR_INVALID_UNIT_VALUE}' 라는 메세지가 나타난다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      const invalidInputValues = ['999', '100', '1001', '-1000'];
      invalidInputValues.forEach((value, idx) => {
        getPurchaseAmount().type(value);
        getPurchaseButton()
          .click()
          .then(() => {
            const actualMessage = alertStub.getCall(0).lastArg;
            expect(actualMessage).to.equal(MESSAGE_FOR_INVALID_UNIT_VALUE);
            if (idx < invalidInputValues.length) {
              getPurchaseAmount().clear();
            }
          });
      });
    });

    it('로또 발급 전에는 구매금액 입력 폼을 제외하고 다른 요소들은 보이지 않는다.', () => {
      getPurchasedLottoList().should('have.css', 'display', 'none');
      getWinningNumberInputs().should('have.css', 'display', 'none');
    });

    it('로또 구입시, 구매한 로또의 정보를 나타내는 섹션과, 당첨번호 입력 폼이 나타난다.', () => {
      purchaseLottos();
      getPurchasedLottoList().should('not.have.css', 'display', 'none');
      getWinningNumberInputs().should('not.have.css', 'display', 'none');
    });

    it('로또 구입 시, 구매한 로또의 개수를 안내하는 문구와 함께 실제 구매한 개수를 문자로 화면에 표시한다.', () => {
      purchaseLottos(3000);
      getNoticeTotalQuantity().should('exist');
      getTotalQuantity().should('text', '3');
    });

    it('로또 구입 시, 구매한 금액 만큼의 개수만큼 로또 아이콘이 화면에 나타난다.', () => {
      purchaseLottos(3000);
      getLottoIconList().find('.lotto-item').should('have.length', '3');
    });

    it('로또 구입 후, 금액을 바꾸어 다시 구입하는 경우, 새로 입력한 구매 금액만큼의 로또 아이콘이 화면에 나타난다.', () => {
      purchaseLottos(3000);
      getLottoIconList().find('.lotto-item').should('have.length', '3');
      getPurchaseAmount().clear();
      purchaseLottos(2000);
      getLottoIconList().find('.lotto-item').should('have.length', '2');
    });

    it('번호보기 버튼을 누르면, 로또 아이콘이 일렬로 정렬된다.', () => {
      purchaseLottos();
      getLottoNumbersToggleButton().click();
      getLottoIconList().should('have.css', 'flex-direction', 'column');
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 하며, 번호보기 토글 버튼 클릭 시 번호를 볼 수 있다.', () => {
    it('번호보기 버튼을 누르면, 로또 아이콘의 옆에 6가지 서로 다른 번호가 나타나야 한다.', () => {
      purchaseLottos();
      getLottoNumbers().should('have.css', 'display', 'none');
      getLottoNumbersToggleButton().click();
      getLottoNumbers().should('have.not.css', 'display', 'none');
      getLottoNumbers().should(($numbers) => {
        const size = new Set($numbers.text().split(',').map(Number)).size;
        expect(size).equal(LOTTO_LENGTH);
      });
    });

    it('로또 번호는 1-45의 범위 안에 존재한다.', () => {
      purchaseLottos();
      getLottoNumbersToggleButton().click();
      getLottoNumbers().should(($numbers) => {
        const text = $numbers.text();
        const numArr = text.split(',');
        const isValidNumber = numArr.every(
          (num) => num < LOTTO_NUMBER_RANGE_MAX + 1 && num > LOTTO_NUMBER_RANGE_MIN
        );
        expect(isValidNumber).to.be.true;
      });
    });

    it('자동구매된 로또는 서로 같지 않아야 한다.', () => {
      const arrayA = [1, 2, 3, 4, 5, 6];
      const arrayB = [2, 4, 1, 3, 6, 5];
      const result = isAlreadyExist([arrayA, arrayB]);
      expect(result).to.be.true;
    });
  });
});
