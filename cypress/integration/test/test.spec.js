import { ERR_MSG, LOTTO_PRICE } from '../../../src/js/constants';

describe('행운의 로또 테스트', () => {
  const clickBuyBtn = () => cy.get('.buy-lotto-button').click();
  const typeMoneyInput = (money) => cy.get('.money-input').type(money);
  const buyLotto = (n) => {
    typeMoneyInput(n * LOTTO_PRICE);
    clickBuyBtn();
  };
  const clickToggle = () =>
    cy.get('.lotto-numbers-toggle-button').click({ force: true });

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

  describe('로또를 구매하면', () => {
    it('구매한 개수가 아래에 표시된다.', () => {
      buyLotto(3);
      cy.get('.number-label').should('have.text', '총 3개를 구매하였습니다.');
    });
    it('구매한만큼 로또 아이콘이 생긴다.', () => {
      buyLotto(3);
      cy.get('.lotto-icon').each((item, index, list) =>
        expect(list).to.have.length(3)
      );
    });
  });

  describe('토글을', () => {
    it('건드리지 않으면 숫자가 안보인다.', () => {
      buyLotto(1);
      cy.get('.lotto-numbers').should('not.be.visible');
    });
    it('켜면 숫자가 표시된다.', () => {
      buyLotto(1);
      clickToggle();
      cy.get('.lotto-numbers').should('be.visible');
    });
    it('끄면 숫자가 안보인다', () => {
      buyLotto(1);
      clickToggle();
      clickToggle();
      cy.get('.lotto-numbers').should('not.be.visible');
    });
  });
});
