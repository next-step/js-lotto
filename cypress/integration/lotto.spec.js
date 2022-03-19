import { CLASS } from '../../src/js/const/className.js';
import { alertMessage, MIN_MONEY_UNIT } from '../../src/js/const/constant.js';

// const BASE_URL = cy.config('baseUrl');
before(() => cy.visit('http://127.0.0.1:5500/index.html'));

describe('로또 어플리케이션 테스트', () => {
  describe('스텝 1 : 구매하기', () => {
    it('최소 구매금액은 1000원이다.', () => {
      cy.submitMoney(500).alert(alertMessage.ALERT_MIN_AMOUNT_TO_ISSUE_LOTTO);
      cy.submitMoney(800).alert(alertMessage.ALERT_MIN_AMOUNT_TO_ISSUE_LOTTO);
    });

    it('금액을 입력하면, 해당 금액만큼 로또를 발급한다.', () => {
      cy.submitMoney(3000).issueLottos();
    });

    it('번호보기 토글 버튼을 클릭하면, 복권번호를 볼 수 있다.', () => {
      cy.toggleNumbers(true);
    });

    it('로또를 새로 발급하면, 로또 번호가 숨겨진다.', () => {
      cy.submitMoney(1000).issueLottos();
      cy.toggleNumbers(false);
    });
  });
});
