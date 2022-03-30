import { ERROR_MESSAGE, AMOUNT_UNIT, MAX_LOTTO_NUMBER } from '../../src/js/services/constants.js';
import LottoService from '../../src/js/services/Lotto.service.js';

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
      cy.get('.modal').should('not.be.visible');
    });

    it('로또 구입 금액 입력창은 비어 있어야 한다.', () => {
      cy.get('[data-props="amount-input"]').should('have.text', '');
    });
  });

  describe('로또 구입 금액이 정상인 경우', () => {
    it('로또 구입 금액을 입력하면, 수동 구매 모달이 팝업되며 가격에 맞는 총 구매 가능한 개수가 출력된다.', () => {
      cy.inputAmount('3000');
      cy.get('.modal').should('be.visible');
      cy.get('[data-props="available-count-h3"]').should('have.text', '총 3장 구매할 수 있어요!');
    });

    describe('수동 구매 개수가 비정상인 경우', () => {
      it('수동 구매 개수는 총 구매 개수보다 많을 수 없다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);
        cy.inputAmount('3000');
        cy.get('[data-props="purchase-count-input"]').type('4');
        cy.get('[data-props="purchase-count-button"]')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_MESSAGE.IMPOSSIBLE_COUNT);
          });
      });

      it('수동 구매 개수는 0보다 작을 수 없다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);
        cy.inputAmount('3000');
        cy.get('[data-props="purchase-count-input"]').type('-1');
        cy.get('[data-props="purchase-count-button"]')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_MESSAGE.IMPOSSIBLE_COUNT);
          });
      });

      it('수동 구매 개수는 숫자 이외의 문자가 올 수 없다.', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);
        cy.inputAmount('3000');
        cy.get('[data-props="purchase-count-input"]').type('네개');
        cy.get('[data-props="purchase-count-button"]')
          .click()
          .then(() => {
            expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
          });
      });
    });

    describe('수동 구매 개수가 정상인 경우', () => {
      it('수동 구매 개수만큼 로또 번호를 입력할 수 있어야 한다.', () => {
        cy.inputAmount('3000');
        cy.get('[data-props="purchase-count-input"]').type('1');
        cy.get('[data-props="purchase-count-button"]').click();
        cy.get('.scroll-area').should('be.visible');
      });
    });

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

  describe('당첨 번호를 입력하지 않고 로또 결과를 확인하는 경우', () => {
    it('"숫자를 입력해주세요." 경고창을 출력한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('3000');
      cy.checkLottoNumbers().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
      });
    });
  });

  describe('당첨 번호를 입력하고 로또 결과를 확인하는 경우', () => {
    it('당첨 번호를 하나라도 적지 않으면 "숫자를 입력해주세요." 경고창을 출력한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('3000');
      cy.inputWinningNumbers([1, 2, 3, 4, '-', 6, 7]);
      cy.checkLottoNumbers().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.REQUIRED_DIGIT);
      });
    });

    it(`입력한 당첨 번호가 ${MAX_LOTTO_NUMBER}를 넘으면 "${ERROR_MESSAGE.MUST_LESS_THAN}" 경고창을 출력한다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('3000');
      cy.inputWinningNumbers([1, 2, 3, 4, 46, 6, 7]);
      cy.checkLottoNumbers().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_LESS_THAN);
      });
    });

    it(`입력한 당첨 번호가 중복되면 "${ERROR_MESSAGE.MUST_NOT_DUPLICATE}" 경고창을 출력한다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('3000');
      cy.inputWinningNumbers([1, 2, 3, 4, 6, 6, 7]);
      cy.checkLottoNumbers().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_NOT_DUPLICATE);
      });
    });

    it(`입력한 당첨 번호가 음수라면 "${ERROR_MESSAGE.MUST_MORE_THAN_ONE}" 경고창을 출력한다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.inputAmount('3000');
      cy.inputWinningNumbers([1, 2, 3, 4, 6, -1, 7]);
      cy.checkLottoNumbers().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.MUST_MORE_THAN_ONE);
      });
    });

    it('당첨 번호를 정상적으로 입력했다면 당첨 통계 모달이 출력된다.', () => {
      cy.inputAmount('3000');
      cy.inputWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
      cy.checkLottoNumbers();
      cy.get('.modal').should('be.visible');
    });

    it('당첨 번호를 정상적으로 입력했다면 당첨 갯수와 수익률을 계산한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6, 7];

      cy.inputAmount('3000');
      cy.inputWinningNumbers(winningNumbers);
      cy.checkLottoNumbers().then(() => {
        LottoService.amount = 3000;
        const countResult = LottoService.lotteryResult(winningNumbers);
        const winningResult = LottoService.lotterySummary(countResult);
        const profitRate = LottoService.profitRateCalculate(winningResult);
        cy.get('[data-props="winning-result-3-td"]').should(
          'have.text',
          `${winningResult[3] || 0}개`,
        );
        cy.get('[data-props="winning-result-4-td"]').should(
          'have.text',
          `${winningResult[4] || 0}개`,
        );
        cy.get('[data-props="winning-result-5-td"]').should(
          'have.text',
          `${winningResult[5] || 0}개`,
        );
        cy.get('[data-props="winning-result-5-1-td"]').should(
          'have.text',
          `${winningResult['5-1'] || 0}개`,
        );
        cy.get('[data-props="winning-result-6-td"]').should(
          'have.text',
          `${winningResult[6] || 0}개`,
        );
        cy.get('[data-props="winning-rate-p"]').should(
          'have.text',
          `당신의 총 수익률은 ${profitRate}%입니다.`,
        );
      });
    });
  });
});
