// [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// [x] 로또 1장의 가격은 1,000원이다.
// [x] 소비자는 자동 구매를 할 수 있어야 한다.
// [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

import { ERROR_MESSAGES, NUMBER } from '../../src/js/constants';
import { isRangeNumberInLotto } from '../../src/js/utils';

const handleInputPrice = (number) => cy.get('#form-price input[type=number]').type(number);

describe('로또 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('초기 화면 노출', () => {
    cy.get('#lotto-list').should('not.be.visible');
    cy.get('#form-winning').should('not.be.visible');
  });

  describe('금액 입력 에러', () => {
    it('금액 입력 없을 경우', () => {
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.EMPTY));
    });
    it('1000원 이하 입력하는 경우', () => {
      handleInputPrice(500);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.MIN_PRICE));
    });
    it('100000원 초과 입력하는 경우', () => {
      handleInputPrice(500);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.MAX_PRICE));
    });
    it('금액단위가 안맞는 경우', () => {
      handleInputPrice(2022);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.BUY_UNIT));
    });
  });

  describe('정상금액 입력', () => {
    it('구매 성공시 수량 및 아이콘 표시', () => {
      handleInputPrice(3000);
      cy.get('#lotto-list').should('be.visible');
      cy.get('#form-winning').should('be.visible');
      cy.get('li.lotto-list-item').should('have.length', 3);
      cy.get('label[data-lotto="count-label"]').contains(3);
    });
  });

  describe('번호보기 토글 클릭시', () => {
    it('6개숫자, 중복되지 않음', () => {
      cy.get('.lotto-numbers-toggle-button').click();

      cy.get('li.lotto-list-item').each(($item) => {
        const numbers = $item.get('.lotto-detail').text().split(', ');
        expect(numbers.length).to.equal(NUMBER.LOTTO_LENGTH);
        expect(new Set(numbers).size).to.equal(NUMBER.LOTTO_LENGTH);
        for (number of numbers) {
          const isLottoNumber = isRangeNumberInLotto(number);
          expect(isLottoNumber).to.be.true;
        }
      });
    });
  });
});
