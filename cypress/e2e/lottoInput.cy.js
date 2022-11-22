import { ERROR_MESSAGE } from '../../src/js/constants/index.js';

describe('구입 금액 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });
  describe('로또 구입 금액의 단위는 1000원이다.', () => {
    const alertInput = () => {
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_PRICE_UNIT);
      });
    };
    it('10000 입력한 상태에서 확인 버튼을 클릭한다.', () => {
      cy.clickPurchaseBtn(10000);
    });
    it('2000 입력한 상태에서 enter를 누른다.', () => {
      cy.pressEnter(2000);
    });
    it('1234 입력한 상태에서 확인 버튼을 클릭했을 때 alert 창이 뜬다.', () => {
      cy.clickPurchaseBtn(1234);
      alertInput();
    });
    it('2500 입력한 상태에서 enter를 눌렀을 때 alert 창이 뜬다.', () => {
      cy.pressEnter(2500);
      alertInput();
    });
  });
  describe('로또 구입 금액은 1000원 이상이다.', () => {
    const alertNotOverOneThousand = () =>
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGE.INVALID_OVER_MIN_PRICE);
      });
    it('0원 입력하면 alert창이 뜬다.', () => {
      cy.clickPurchaseBtn(0);
      alertNotOverOneThousand();
    });
    it('700원 입력하면 alert창이 뜬다.', () => {
      cy.clickPurchaseBtn(700);
      alertNotOverOneThousand();
    });
  });
});
