import Lotto from '../../src/js/lotto';

const lotto = new Lotto();

describe('로또 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('로또 구입 금액을 입력한다.', () => {
    it('입력할 Input 태그가 있다.', () => {
      cy.get('#input-price').should('be.visible');
    });

    it('입력한 금액이 화면에 노출된다.', () => {
      cy.get('#input-price').type(2000);
      cy.get('#input-price').should('have.value', 2000);
    });
  });

  describe('금액에 해당하는 로또를 발급해야 한다.', () => {
    it('확인할 버튼이 있다.', () => {
      cy.get('#input-price-btn').should('be.visible');
    });

    it('금액은 숫자만 입력 가능하다.', () => {
      lotto.setPrice('abcd');
      let result = lotto.validatePrice();
      expect(result).to.equal(false);

      lotto.setPrice(10000);
      result = lotto.validatePrice();
      expect(result).to.equal(true);
    });

    it('금액은 1,000원 단위로만 입력할 수 있다.', () => {
      lotto.setPrice(1200);
      let result = lotto.validatePrice();
      expect(result).to.equal(false);

      lotto.setPrice(2000);
      result = lotto.validatePrice();
      expect(result).to.equal(true);
    });

    it('양수만 입력할 수 있다.', () => {
      lotto.setPrice(-1);
      let result = lotto.validatePrice();
      expect(result).to.equal(false);

      lotto.setPrice(1000);
      result = lotto.validatePrice();
      expect(result).to.equal(true);
    });
  });

  describe('로또 1장의 가격은 1,000원이다.', () => {
    it('입력한 금액 / 1,000 값인 결과가 구매한 로또의 숫자가 된다.', () => {
      lotto.setPrice(2000);
      let count = lotto.getLottoCount();
      expect(count).to.equal(2);
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    it('구매한 로또 숫자가 노출된다.', () => {
      cy.should('eq', '100');
    });
    it('구매한 로또 숫자와 동일한 로또 아이콘이 나열된다.', () => {
      cy.should('eq', '100');
    });
  });

  describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    it('토글 버튼의 기본값은 OFF 이다.', () => {
      cy.should('eq', '100');
    });
    it('토글 버튼을 OFF → ON 변경시 구매한 로또 개수의 아이콘과 숫자가 노출된다.', () => {
      cy.should('eq', '100');
    });
    it('토글 버튼을 ON → OFF 변경시 숫자는 가려지며, 구매한 로또 개수의 아이콘만 노출된다.', () => {
      cy.should('eq', '100');
    });

    it('숫자는 중복이 존재하지 않는다.', () => {
      lotto.setPrice(2000);
      lotto.registerLotto();
      const registeredLotto = lotto.getLotto()[0];
      const uniq = new Set(registeredLotto);
      expect(registeredLotto.length).to.equal(uniq.length);
    });

    it('로또 하나당 숫자는 6개의 숫자가 노출된다.', () => {
      lotto.setPrice(1000);
      lotto.registerLotto();
      const registeredLotto = lotto.getLotto()[0];
      expect(registeredLotto.length).to.equal(6);
    });
  });
});
