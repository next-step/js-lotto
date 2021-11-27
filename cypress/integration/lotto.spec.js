/* eslint-disable */
import { ALERT, LOTTO_INFO } from '../../src/js/constants/constants.js';

const PRICE = 10000;
const INVAILD_PRICE = 1100;

before(() => {
  cy.visit('/');
});

describe('lotto 구입 기능 구현', () => {
  context(
    '로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.',
    () => {
      beforeEach(() => {
        cy.get('#price').clear();
        cy.inputValue('#price', PRICE).type('{enter}');
      });

      it('금액 입력 시 수동 로또 번호 입력 form이 생성된다.', () => {
        cy.checkCss('#manualLottoFormSection', 'display', 'block');
      });

      it('금액 입력 시 남은 금액이 출력된다.', () => {
        cy.get('#remainPrice').should('have.text', `${PRICE}원`);
      });
    }
  );

  context('수동 번호 입력 후 제출', () => {
    before(() => {
      cy.get('#price').clear();
      cy.inputValue('#price', PRICE).type('{enter}');
    });

    it('남은 금액 감소 후 구매 갯수 text 출력', () => {
      [1, 2, 3, 4, 5, 6].forEach((lottoNumber, index) => {
        cy.inputValue(`input[data-manual-number="${index}"]`, lottoNumber);
      });
      cy.clickButton('#submitManualLottoBtn');
      cy.get('#remainPrice').should(
        'have.text',
        `${PRICE - LOTTO_INFO.PRICE_UNIT}원`
      );

      cy.get('#purchasedLottoText').should(
        'have.text',
        `총 1개를 구매하였습니다.`
      );
    });

    it('자동 구매시 남은 금액이 0원으로 되고, 금액 만큼 구매 갯수 text가 출력된다.', () => {
      cy.clickButton('#autoPurchaseBtn');
      cy.get('#remainPrice').should('have.text', `0원`);
      cy.get('#purchasedLottoText').should(
        'have.text',
        `총 ${PRICE / LOTTO_INFO.PRICE_UNIT}개를 구매하였습니다.`
      );
    });
  });

  context('로또 금액의 단위는 1,000원이다.', () => {
    it('금액이 1000원 단위가 아닐 경우, alert 메시지가 출력된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputValue('#price', INVAILD_PRICE)
        .type('{enter}')
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ALERT.CHECK_UNIT);
        });
      cy.get('#price').should('have.text', '');
    });
  });

  context(
    '복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.',
    () => {
      before(() => {
        cy.get('#price').clear();
        cy.inputValue('#price', PRICE).type('{enter}');
        cy.clickButton('#autoPurchaseBtn');
      });

      it('토글 버튼 클릭시 복권 영역이 세로 정렬된다.', () => {
        cy.clickButton('.switch');
        cy.checkClassName('#lottoWrapper', 'flex-col');
      });

      it('복권 번호가 보여진다.', () => {
        cy.get('.lotto-detail').each(($el) => {
          expect($el).to.have.css('display', 'block');
        });
      });
    }
  );

  context('당첨번호를 입력', () => {
    it('당첨번호에 중복이 있다면 alert 발생', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      [1, 1, 1, 1, 1, 1, 1].forEach((lottoNumber, index) => {
        cy.inputValue(`input[data-lotto-number="${index}"]`, lottoNumber);
      });

      cy.clickButton('.open-result-modal-button').then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT.DUPLICATED);
      });
    });

    it('당첨 안내 modal 생성', () => {
      [1, 2, 3, 4, 5, 6, 7].forEach((lottoNumber, index) => {
        cy.get(`input[data-lotto-number="${index}"]`).clear();
        cy.inputValue(`input[data-lotto-number="${index}"]`, lottoNumber);
      });

      cy.clickButton('.open-result-modal-button');
      cy.checkClassName('#resultModalSection', 'open');

      cy.clickButton('#modalClose');
      cy.checkClassName('#resultModalSection', 'open', false);
    });
  });

  context('로또 초기화', () => {
    beforeEach(() => {
      cy.get('#price').clear();
      cy.inputValue('#price', PRICE).type('{enter}');
      cy.clickButton('#autoPurchaseBtn');
    });

    it('당첨 안내 modal 생성 후 초기화', () => {
      [1, 2, 3, 4, 5, 6, 7].forEach((lottoNumber, index) => {
        cy.get(`input[data-lotto-number="${index}"]`).clear();
        cy.inputValue(`input[data-lotto-number="${index}"]`, lottoNumber);
      });

      cy.clickButton('#openResultModalBtn').then(() => {
        cy.checkClassName('#resultModalSection', 'open');
      });

      cy.clickButton('#resetBtn');
      cy.checkCss('#purchasedLottoSection', 'display', 'none');
      cy.checkCss('#winningNumberFormSection', 'display', 'none');
    });
  });
});
