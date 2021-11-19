/* eslint-disable */
import { ALERT, LOTTO_INFO } from '../../src/js/constants/constants.js';

const PRICE = 10000;
const INVAILD_PRICE = 1100;

before(() => {
  cy.visit('/');
});

describe('lotto 구입 기능 구현', () => {
  beforeEach(() => {
    cy.get('#price').clear();
  });

  context(
    '로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.',
    () => {
      beforeEach(() => {
        cy.inputValue('#price', PRICE).type('{enter}');
      });

      it('금액 입력 시 lotto 영역과 당첨번호 입력 form이 생성된다.', () => {
        cy.checkCss('#purchasedLottoSection', 'display', 'block');
        cy.checkCss('#winningNumberFormSection', 'display', 'block');
      });

      it('금액 입력 시 구매 갯수 text가 출력된다.', () => {
        cy.get('#purchasedLottoText').should(
          'have.text',
          `총 ${PRICE / LOTTO_INFO.PRICE_UNIT}개를 구매하였습니다.`
        );
      });

      it('금액 입력 시 구매 갯수 만큼의 lotto가 출력된다.', () => {
        cy.get('#lottoWrapper div').should(
          'have.length',
          PRICE / LOTTO_INFO.PRICE_UNIT
        );
      });
    }
  );

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
        cy.inputValue('#price', PRICE).type('{enter}');
        cy.clickButton('.switch');
      });

      it('토글 버튼 클릭시 복권 영역이 세로 정렬된다.', () => {
        cy.checkClassName('#lottoWrapper', 'flex-col');
      });

      it('복권 번호가 보여진다.', () => {
        cy.get('.lotto-detail').each(($el) => {
          expect($el).to.have.css('display', 'block');
        });
      });
    }
  );
});
