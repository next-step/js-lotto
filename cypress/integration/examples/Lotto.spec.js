import {
  INVALID_LOTTO_PRICE,
  INVALID_LOTTO_MINIMUM_PRICE,
  INVALID_LOTTO_MAXIMUM_PRICE,
} from '../../../src/js/utils/constants.js';

const BASE_URL = '../../index.html';

const buyLotto = (money) => {
  cy.get('#input-price').type(money);
  cy.get('#input-price-btn').click();
};

describe('Lotto', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('step 1: 구입 기능', () => {
    it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
      buyLotto('3000');
      cy.get('#purchased-lotto').should(
        'have.text',
        '총 3개를 구매하였습니다.'
      );
    });

    it('1000원 단위로 로또를 구매 할 수 있다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#input-price').type('3200');
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(INVALID_LOTTO_PRICE);
        });
    });

    it('최소 1,000원 미만의 금액을 입력하면 오류를 발생한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#input-price').type('300');
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(INVALID_LOTTO_MINIMUM_PRICE);
        });
    });

    it('최대 100,000원이 넘는 금액을 입력하면 오류를 발생한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#input-price').type('3000000');
      cy.get('#input-price-btn')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(INVALID_LOTTO_MAXIMUM_PRICE);
        });
    });

    it('번호보기가 토글(해제)되면, 복권 번호를 볼 수 없다.', () => {
      buyLotto('3000');

      cy.get('#purcharsed-lottos .lotto-detail').each(($span) => {
        expect($span).not.to.be.visible;
      });
    });

    it('번호보기가 토글(체크)되면, 복권 번호를 볼 수 있어야 한다.', () => {
      buyLotto('3000');
      cy.get('.lotto-numbers-toggle-button').check({ force: true });

      cy.get('#purcharsed-lottos').each(($span) => {
        expect($span).to.be.visible;
      });
    });
  });
});
