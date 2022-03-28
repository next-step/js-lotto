import {
  INVALID_LOTTO_PRICE,
  INVALID_LOTTO_MINIMUM_PRICE,
  INVALID_LOTTO_MAXIMUM_PRICE,
  INVALID_LOTTO_NUMBER,
  INVALID_MINIMUM_LOTTO_NUMBER,
  INVALID_MAXIMUM_LOTTO_NUMBER,
  INVALID_OVERLAP_LOTTO_NUMBER,
} from '../../../src/js/utils/constants.js';
import { $ } from '../../../src/js/utils/dom.js';

const BASE_URL = '../../index.html';

const buyLotto = (money, clickEvent) => {
  cy.get('#input-price').type(money);
  cy.get('#input-price-btn')
    .click()
    .then(() => clickEvent);
};

const setWinLottoNumber = (lottoNumber, clickEvent) => {
  cy.get('.winning-number').each((winNumber, index) => {
    cy.get(winNumber).type(lottoNumber[index]);
  });
  cy.get('#show-result-btn')
    .click()
    .then(() => clickEvent);
};

describe('Lotto', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('step 1: 구입 기능', () => {
    it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
      buyLotto(3000);
      cy.get('#purchased-lotto').should(
        'have.text',
        '총 3개를 구매하였습니다.'
      );
    });

    it('1000원 단위로 로또를 구매 할 수 있다.', () => {
      buyLotto(3200, () =>
        expect(alertStub).to.be.calledWith(INVALID_LOTTO_PRICE)
      );
    });

    it('최소 1,000원 미만의 금액을 입력하면 오류를 발생한다.', () => {
      buyLotto(300, () =>
        expect(alertStub).to.be.calledWith(INVALID_LOTTO_MINIMUM_PRICE)
      );
    });

    it('최대 100,000원이 넘는 금액을 입력하면 오류를 발생한다.', () => {
      buyLotto(3000000, () =>
        expect(alertStub).to.be.calledWith(INVALID_LOTTO_MAXIMUM_PRICE)
      );
    });

    it('번호보기가 토글(해제)되면, 복권 번호를 볼 수 없다.', () => {
      buyLotto(3000);
      cy.get('#purcharsed-lottos .lotto-detail').each((lottoNumber) => {
        expect(lottoNumber).not.to.be.visible;
      });
    });

    it('번호보기가 토글(체크)되면, 복권 번호를 볼 수 있어야 한다.', () => {
      buyLotto(3000);
      cy.get('.lotto-numbers-toggle-button').check({ force: true });

      cy.get('#purcharsed-lottos').each((lottoNumber) => {
        expect(lottoNumber).to.be.visible;
      });
    });
  });
  describe('step 2: 1) 당첨 결과 기능', () => {
    it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
      buyLotto(2000);
      setWinLottoNumber([1, 2, 3, 4, 5, 6, 7]);
    });

    it('당첨 번호는 1이상 적어야한다.', () => {
      buyLotto(2000);
      setWinLottoNumber([0, 2, 3, 4, 5, 6, 7], () =>
        expect(alertStub).to.be.calledWith(INVALID_MINIMUM_LOTTO_NUMBER)
      );
    });

    it('당첨 번호는 45이하 적어야한다.', () => {
      buyLotto(2000);
      setWinLottoNumber([47, 2, 3, 4, 5, 6, 7], () =>
        expect(alertStub).to.be.calledWith(INVALID_MAXIMUM_LOTTO_NUMBER)
      );
    });

    it('당첨 번호는 중복 될 수 없다.', () => {
      buyLotto(2000);
      setWinLottoNumber([1, 2, 3, 4, 5, 5, 7], () =>
        expect(alertStub).to.be.calledWith(INVALID_OVERLAP_LOTTO_NUMBER)
      );
    });

    it('당첨 번호는 모두 입력 되어야 한다.', () => {
      buyLotto(2000);
      setWinLottoNumber([1, ' ', 3, 4, 5, 6, 7], () =>
        expect(alertStub).to.be.calledWith(INVALID_LOTTO_NUMBER)
      );
    });

    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
      buyLotto(2000);
      setWinLottoNumber([1, 2, 3, 4, 5, 6, 7]);
      cy.get('#restart_btn').click();
      cy.get('#lotto-num-form').each((lottoNumForm) => {
        expect(lottoNumForm).not.to.be.visible;
      });
    });
  });
});
