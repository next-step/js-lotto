import { ERROR_MESSAGE, AMOUNT_UNIT } from '../../src/js/services/constants.js';

const REQUIRED_AMOUNT_UNIT = AMOUNT_UNIT.toLocaleString('ko-KR');
const BASE_URL = '../../index.html';

describe('Lotto', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('최초 렌더링 시', () => {
    it('로또 구입 금액 입력창만 보여야 한다.', () => {
      cy.get('[data-props="amount-info-form"]').should('be.visible');
      cy.get('.lotto-section').should('not.be.visible');
    });

    it('로또 구입 금액 입력창은 비어 있어야 한다.', () => {
      cy.get('[data-props="amount-input"]').should('have.text', '');
    });
  });

  describe('로또 구입 금액이 정상인 경우', () => {
    it('로또 구입 금액을 입력하면, 금액에 해당하는 개수의 로또를 발급해야 한다.', () => {
      cy.inputAmount('3000');
      cy.get('.lotto-section').should('be.visible');
      cy.get('[data-props="count-span"]').should('have.text', '3');
      cy.purchasedLottoList().should('have.length', 3);
    });

    it('번호보기가 토글(해제)되면, 로또 번호를 볼 수 없다.', () => {
      cy.inputAmount('2000');
      cy.get('[data-props="toggle-button"]').uncheck();
      cy.get('.lotto-list')
        .not('.flex-col')
        .then(() => {
          cy.get('.lotto-numbers').first().should('not.be.visible');
        });
    });

    describe('번호보기 토글(체크)', () => {
      it('로또 번호를 볼 수 있어야 한다.', () => {
        cy.inputAmount('2000');
        cy.get('[data-props="toggle-button"]').check({ force: true });
        cy.get('.lotto-list').then(() => {
          cy.get('.lotto-numbers').first().should('be.visible');
        });
      });

      it('로또 번호는 6개로 구성되며, 1부터 45 사이의 숫자가 중복 없이 존재한다.', () => {
        cy.inputAmount('2000');
        cy.get('[data-props="toggle-button"]').check({ force: true });

        cy.purchasedLottoList().each(lottoNumbersWrapper => {
          const lottoNumbers = lottoNumbersWrapper.find('.lotto-numbers').text().split(', ');
          expect(lottoNumbers.length).to.equal(6);
          expect(new Set(lottoNumbers).size).to.equal(6);
          const filteredLottoNumber = lottoNumbers.filter(number => 0 < number && number < 46);
          expect(filteredLottoNumber.length).to.equal(6);
        });
      });
    });
  });

  describe('로또 구입 금액 입력 시 에러가 발생하는 경우', () => {
    it('인력 값을 입력하지 않으면 경고창을 출력한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('[data-props="confirm-button"]')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
        });
    });

    it(`로또 한 장의 가격은 ${REQUIRED_AMOUNT_UNIT}원이므로 입력 단위는 ${REQUIRED_AMOUNT_UNIT}원이어야 한다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('1234').then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);
      });
    });

    it('로또를 구매하기 위한 최소 금액은 1000원 이상이다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('-1000').then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_MORE_THAN);
      });
    });
  });
});
