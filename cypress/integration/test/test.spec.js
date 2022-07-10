import { ERR_MSG } from '../../../src/js/constants';

describe('행운의 로또 테스트', () => {
  const clickBuyBtn = () => cy.get('.buy-lotto-button').click();
  const typeMoneyInput = (money) => cy.get('.money-input').type(money);

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('확인 버튼을', () => {
    it('누르기 전엔 구매 내역이 뜨지 않는다.', () => {
      cy.get('.lotto-detail').should('not.exist');
    });
    it('누르고 나면 구매 내역이 뜬다.', () => {
      typeMoneyInput('1000');
      clickBuyBtn();
      cy.get('.lotto-detail').should('be.visible');
    });
  });

  describe('확인 버튼을 눌렀을 때 구입 금액이', () => {
    it('1000원 미만이면 구매할 수 없다.', () => {
      typeMoneyInput('500');
      clickBuyBtn();
      cy.get('.lotto-detail').should('not.exist');
    });
    it('100000원 초과면 구매할 수 없다.', () => {
      typeMoneyInput('100001');
      clickBuyBtn();
      cy.get('.lotto-detail').should('not.exist');
    });
    it('1000원 단위가 아니면 alert 창이 뜬다.', () => {
      typeMoneyInput('1200');
      const stub = cy.stub();
      cy.on('window:alert', stub);
      clickBuyBtn().then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERR_MSG.NOT_MULTIPLE_OF_1000);
      });
    });
  });
});
