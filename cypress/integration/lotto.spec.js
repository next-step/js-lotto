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

  it('첫화면 렌더링 시에, 로또리스트, 당첨번호 form 비노출', () => {
    cy.get('#lotto-list').should('not.be.visible');
    cy.get('#form-winning').should('not.be.visible');
  });

  context('로또 금액 입력이 잘못된 경우에 따른 경고창 노출', () => {
    it('로또 금액 입력 없이 확인 버튼 클릭할 때 경고창 노출', () => {
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.EMPTY));
    });
    it('로또 금액을 1,000원 이하로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(500);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.MIN_PRICE));
    });
    it('로또 금액을 100,000원 초과로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(500);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.MAX_PRICE));
    });
    it('로또 금액단위가 맞지않는 경우 경고창 노출', () => {
      handleInputPrice(2022);
      cy.get('#form-price input[type=button]').click();
      cy.on('window.alert', (text) => expect(text).to.be(ERROR_MESSAGES.BUY_UNIT));
    });
  });

  context('로또 금액이 정상적으로 입력된 경우', () => {
    it('로또 구매 성공시 로또 수량 및 로또 아이콘 표시', () => {
      handleInputPrice(3000);
      cy.get('#lotto-list').should('be.visible');
      cy.get('#form-winning').should('be.visible');
      cy.get('li.lotto-list-item').should('have.length', 3);
      cy.get('label[data-lotto="count-label"]').contains(3);
    });
  });

  context('로또 구매 이후 번호보기 토글버튼 클릭한 경우', () => {
    it('6개의 로또번호 숫자가 중복되지 않는지 확인', () => {
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
