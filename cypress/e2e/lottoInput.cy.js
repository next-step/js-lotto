import { ERROR_MESSAGE } from '../../src/js/constants/index.js';

describe('구입 금액 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('구입 금액을 입력할 input 태그가 있다.', () => {
    cy.get('.purchasing-lotto-form').should('exist');
  });

  it('확인 버튼을 클릭할 수 있다.', () => {
    cy.get('.purchasing-lotto-btn').should('exist');
    cy.get('.purchasing-lotto-btn').click();
  });

  const PRICE_INPUT_CASE = {
    INVALID_PRICE_UNIT: 1234,
    INVALID_OVER_MIN_PRICE: 700,
    VALID_PRICE_OF_THOUSAND_WON: 3000,
  };

  describe('로또 구입 금액의 단위는 1000원이다.', () => {
    const alertInvalidPriceUnit = () => {
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_PRICE_UNIT);
      });
    };

    it('1000원 단위 구매 가격을 입력한 상태에서 확인 버튼을 클릭한다.', () => {
      cy.clickPurchaseBtn(PRICE_INPUT_CASE.VALID_PRICE_OF_THOUSAND_WON);
    });

    it('1000원 단위가 아닌 구매 가격을 입력한 상태에서 확인 버튼을 클릭했을 때 alert 창이 뜬다.', () => {
      cy.clickPurchaseBtn(PRICE_INPUT_CASE.INVALID_PRICE_UNIT);
      alertInvalidPriceUnit();
    });

    it('1000원 단위가 아닌 구매 가격을 입력한 상태에서 enter를 누를 때 alert 창이 뜬다.', () => {
      cy.pressEnter(PRICE_INPUT_CASE.INVALID_PRICE_UNIT);
      alertInvalidPriceUnit();
    });
  });

  describe('로또 구입 금액은 1000원 이상이다.', () => {
    const alertInvalidOverMinPrice = () =>
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_OVER_MIN_PRICE);
      });

    it('1000원 미만인 구입 금액을 입력했을 때 alert창이 뜬다.', () => {
      cy.clickPurchaseBtn(700);
      alertInvalidOverMinPrice();
    });
  });
});
