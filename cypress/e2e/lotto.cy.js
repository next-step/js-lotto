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

    it('금액은 1,000원 단위로만 입력할 수 있다.', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('#input-price').type(2500);
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            '1,000단위의 숫자를 입력해주세요.'
          );
        });
    });

    it('양수만 입력할 수 있다.', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('#input-price').type(-1000);
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            '0이상의 숫자를 입력해주세요.'
          );
        });
    });
  });

  describe('로또 1장의 가격은 1,000원이다.', () => {
    it('입력한 금액 / 1,000 값인 결과가 구매한 로또의 숫자가 된다.', () => {
      cy.get('#input-price').type(2000);
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          cy.get('#total-purchased').should('have.text', 2);
        });
    });
  });

  describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    it('구매한 로또 숫자와 동일한 로또 아이콘이 나열된다.', () => {
      cy.get('#input-price').type(5000);
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          cy.get('#total-purchased').should('have.text', 5);
          cy.get('.lotto-icon').should('have.length', 5);
        });
    });
  });

  describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    it('토글 버튼을 OFF → ON 변경시 구매한 로또 개수의 아이콘과 숫자가 노출된다.', () => {
      cy.get('#input-price').type(5000);
      cy.get('#input-price-btn').click();
      cy.get('.switch').click();
      const lottoDetail = cy.get('.lotto-detail');
      lottoDetail.should('have.length', 5);
    });

    it('토글 버튼을 ON → OFF 변경시 숫자는 가려지며, 구매한 로또 개수의 아이콘만 노출된다.', () => {
      cy.get('#input-price').type(5000);
      cy.get('#input-price-btn').click();
      cy.get('.switch').click();
      cy.get('.switch').click();
      const lottoDetail = cy.get('.lotto-detail');
      lottoDetail.should('have.length', 0);
    });

    it('숫자는 중복이 존재하지 않는다.', () => {
      lotto.setPrice(2000);
      lotto.registerLotto();
      const registeredLotto = lotto.getLottos()[0];
      const uniq = new Set(registeredLotto);
      expect(registeredLotto.length).to.equal(uniq.size);
    });

    it('로또 하나당 숫자는 6개의 숫자가 노출된다.', () => {
      lotto.setPrice(1000);
      lotto.registerLotto();
      const registeredLotto = lotto.getLottos()[0];
      expect(registeredLotto.length).to.equal(6);
    });
  });
});
