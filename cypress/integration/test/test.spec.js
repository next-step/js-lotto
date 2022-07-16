import { ERR_MSG } from '../../../src/js/constants';

describe('행운의 로또 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('구입할 금액을 입력하고 확인 버튼을 누르면 구매 내역을 볼 수 있다.', () => {
    context('확인 버튼을', () => {
      it('누르기 전엔 구매 내역이 뜨지 않는다.', () => {
        cy.get('.lotto-detail').should('not.exist');
      });
      it('누르고 나면 구매 내역이 뜬다.', () => {
        cy.typeMoney('1000');
        cy.clickBuy();
        cy.get('.lotto-detail').should('be.visible');
      });
    });
  });

  describe('올바르지 않은 금액을 입력하면 로또를 구입할 수 없다.', () => {
    context('구입 금액이 ', () => {
      it('1000원 미만이면 구매할 수 없다.', () => {
        cy.typeMoney('500');
        cy.clickBuy();
        cy.get('.lotto-detail').should('not.exist');
      });
      it('100000원 초과면 구매할 수 없다.', () => {
        cy.typeMoney('100001');
        cy.clickBuy();
        cy.get('.lotto-detail').should('not.exist');
      });
      it('1000원 단위가 아니면 alert 창이 뜬다.', () => {
        cy.typeMoney('1200');
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.clickBuy().then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            ERR_MSG.NOT_MULTIPLE_OF_1000
          );
        });
      });
    });
  });

  describe('로또를 구입 금액을 입력하고 확인을 누르면, 금액에 해당하는만큼의 로또가 발급된다.', () => {
    context('로또를 구매하면', () => {
      it('구매한 개수가 아래에 표시된다.', () => {
        cy.buyLotto(3);
        cy.get('.number-label').should('have.text', '총 3개를 구매하였습니다.');
      });
      it('구매한만큼 로또 아이콘이 생긴다.', () => {
        cy.buyLotto(3);
        cy.get('.lotto-icon').each((item, index, list) =>
          expect(list).to.have.length(3)
        );
      });
    });
  });

  describe('번호보기 토글 버튼을 누르면 번호를 볼 수 있다.', () => {
    context('번호보기 토글 버튼을 ', () => {
      it('건드리지 않으면 숫자가 안보인다.', () => {
        cy.buyLotto(1);
        cy.get('.lotto-numbers').should('not.be.visible');
      });
      it('켜면 숫자가 표시된다.', () => {
        cy.buyLotto(1);
        cy.clickToggle();
        cy.get('.lotto-numbers').should('be.visible');
      });
      it('끄면 숫자가 안보인다', () => {
        cy.buyLotto(1);
        cy.clickToggle();
        cy.clickToggle();
        cy.get('.lotto-numbers').should('not.be.visible');
      });
    });
  });
});
