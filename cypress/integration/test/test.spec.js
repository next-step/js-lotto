import { ERR_MSG, PLACE, PRIZE } from '../../../src/js/constants';
import { getLottoTotalPrize } from '../../../src/js/lotto';

describe('행운의 로또 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('구입할 금액을 입력하고 확인 버튼을 누르면 구매 내역을 볼 수 있다.', () => {
    context('확인 버튼을', () => {
      it('누르기 전엔 구매 내역이 뜨지 않는다.', () => {
        cy.get('#lotto-list').should('not.exist');
      });
      it('누르고 나면 구매 내역이 뜬다.', () => {
        cy.typeMoney('1000');
        cy.clickBuy();
        cy.get('#lotto-list').should('be.visible');
      });
    });
  });

  describe('올바르지 않은 금액을 입력하면 로또를 구입할 수 없다.', () => {
    context('구입 금액이 ', () => {
      it('1000원 미만이면 구매할 수 없다.', () => {
        cy.typeMoney('500');
        cy.clickBuy();
        cy.get('#lotto-list').should('not.exist');
      });
      it('100000원 초과면 구매할 수 없다.', () => {
        cy.typeMoney('100001');
        cy.clickBuy();
        cy.get('#lotto-list').should('not.exist');
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

  describe('로또 당첨 금액이 올바르게 계산된다.', () => {
    it('등수에 맞는 금액 계산', () => {
      const resultArray1 = [0, 0, 0, 0, 0];
      expect(getLottoTotalPrize(resultArray1)).to.eq(0);

      const resultArray2 = [1, 0, 0, 0, 0];
      expect(getLottoTotalPrize(resultArray2)).to.eq(PRIZE[PLACE.FIRST]);

      const resultArray3 = [0, 0, 1, 0, 1];
      expect(getLottoTotalPrize(resultArray3)).to.eq(
        PRIZE[PLACE.THIRD] + PRIZE[PLACE.FIFTH]
      );

      const resultArray4 = [0, 1, 0, 0, 1];
      expect(getLottoTotalPrize(resultArray4)).to.eq(
        PRIZE[PLACE.SECOND] + PRIZE[PLACE.FIFTH]
      );

      const resultArray5 = [0, 1, 2, 5, 8];
      expect(getLottoTotalPrize(resultArray5)).to.eq(
        PRIZE[PLACE.SECOND] +
          PRIZE[PLACE.THIRD] * 2 +
          PRIZE[PLACE.FOURTH] * 5 +
          PRIZE[PLACE.FIFTH] * 8
      );
    });
  });

  describe('당첨번호와 보너스 번호를 넣고 결과 확인하기를 누르면 결과 모달창이 뜬다.', () => {
    it('당첨번호와 보너스 번호를 제대로 넣으면 결과 모달창이 뜬다.', () => {
      cy.buyLotto(3);
      cy.typeWinningNumbers([1, 2, 3, 4, 5, 6], 7);
      cy.clickResult();
      cy.get('.modal').should('be.visible');
    });
    it('공백이 있으면 결과 모달창이 뜨지 않는다.', () => {
      cy.buyLotto(3);
      cy.clickResult();
      cy.get('.modal').should('not.be.visible');
    });
    it('1보다 작은 숫자가 있으면 결과 모달창이 뜨지 않는다.', () => {
      cy.buyLotto(3);
      cy.typeWinningNumbers([1, 2, 0, 4, 5, 6], 7);
      cy.clickResult();
      cy.get('.modal').should('not.be.visible');
    });
    it('45보다 큰 숫자가 있으면 결과 모달창이 뜨지 않는다.', () => {
      cy.buyLotto(3);
      cy.typeWinningNumbers([1, 2, 56, 4, 5, 6], 7);
      cy.clickResult();
      cy.get('.modal').should('not.be.visible');
    });
    it('중복된 숫자가 있으면 결과 모달창이 뜨지 않고 alert 창이 뜬다.', () => {
      cy.buyLotto(3);
      cy.typeWinningNumbers([1, 2, 2, 4, 5, 6], 7);

      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.clickResult().then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ERR_MSG.NOT_A_DUPLICATE_NUMBER
        );
      });
      cy.get('.modal').should('not.be.visible');
    });
  });

  describe('다시 시작하기 버튼을 누르면 초기화된다.', () => {
    context(
      '다시 시작하기 버튼을 누르면 구매 내역이 뜨지 않는 상태로 돌아간다.',
      () => {
        it('다시 시작하기 버튼을 누르면 구매 내역이 뜨지 않는 상태로 돌아간다.', () => {
          cy.buyLotto(3);
          cy.typeWinningNumbers([1, 2, 3, 4, 5, 6], 7);
          cy.clickResult();
          cy.clickReset();
          cy.get('#lotto-list').should('not.exist');
        });
        it('다시 시작하기 버튼을 누른 후 다시 로또 구매가 가능하다.', () => {
          cy.buyLotto(3);
          cy.typeWinningNumbers([1, 2, 3, 4, 5, 6], 7);
          cy.clickResult();
          cy.clickReset();
          cy.buyLotto(3);
          cy.get('#lotto-list').should('be.visible');
        });
      }
    );
  });
});
