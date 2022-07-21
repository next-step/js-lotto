import { LOTTO } from '../../src/js/constants.js';

const LOTTO_PRICE = {
  FAIL_TEST_PRICE: 1350,
  SUCCESS_TEST_PRICE: 3000,
};

describe('Lotto 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('input에 구입금액을 입력하고 확인버튼을 누른 경우', () => {
    it(`value값이 ${LOTTO.UNIT}원으로 나누어떨어지지 않는다면 경고를표시하고 초기화한다.`, () => {
      cy.submitPriceInputForm(LOTTO_PRICE.FAIL_TEST_PRICE);
      cy.onOccurAlert(`로또 구입 금액을 ${LOTTO.UNIT}원 단위로 입력해 주세요.`);
      cy.get('.mr-2').should('have.value', '');
    });

    describe(`value값이 ${LOTTO.UNIT}원으로 나누어떨어진다면`, () => {
      it(`value값이 반환된다.`, () => {
        cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
        cy.get('.mr-2').should('have.value', `${LOTTO_PRICE.SUCCESS_TEST_PRICE}`);
      });
    });
  });

  describe('로또 구매시', () => {
    it(`로또 구매 금액에 따른 로또목록을 볼 수 있어야한다.`, () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('#purchase-section').should('have.class', 'is-active');
      cy.get('#purchase-section').should('be.visible');
    });

    it(`당첨 번호 입력하는 폼을 볼 수 있어야한다.`, () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('#lotto-winning-number-form').should('have.class', 'is-active');
      cy.get('#lotto-winning-number-form').should('be.visible');
    });

    it(`로또 1장의 가격은 ${LOTTO.UNIT}원 이고 ${LOTTO_PRICE.SUCCESS_TEST_PRICE}원 구매시 3개가 구매된다.`, () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('.my-0').contains(`총 3개를 구매하였습니다.`);
    });

    it(`소비자는 자동 구매를 할 수 있어야 한다.`, () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('#lotto-wrapper-list>.lotto-wrapper').should('have.length', 3);
      cy.get('#lotto-wrapper-list>.lotto-wrapper>.lotto-icon').should('have.length', 3);
      cy.get('#lotto-wrapper-list>.lotto-wrapper>.lotto-detail').should('have.length', 3);
    });

    it('하나의 로또의 번호의 갯수는 6개 이다.', () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('.lotto-detail').each((element) => {
        const lottoNumbers = element
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        expect(lottoNumbers).to.have.lengthOf(6);
      });
    });

    it('로또 숫자는 1이상 45이하의 숫자이다.', () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('.lotto-detail').each((element) => {
        const lottoNumbers = element
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        lottoNumbers.forEach((number) => {
          expect(number).to.above(0);
          expect(number).to.below(46);
        });
      });
    });

    it('로또 하나의 숫자들은 중복되지 않는다.', () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.get('.lotto-detail').each((element) => {
        const lottoNumbers = element
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        const noOverlapNumber = new Set();
        for (let i = 0; i < lottoNumbers.length; i++) {
          if (lottoNumbers.includes(lottoNumbers[i])) {
            noOverlapNumber.add(lottoNumbers[i]);
          }
        }
        expect(noOverlapNumber.size).to.equal(6);
      });
    });
  });

  describe('번호보기 버튼 클릭시', () => {
    it('랜덤으로 생성된 로또번호를 볼 수 있어야 한다.', () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.showToggleButtonClick();
      cy.get('.lotto-numbers-toggle-button').should('be.checked');
      cy.get('.lotto-detail').should('be.visible');
    });

    it('로또번호가 보여지고 있다면 숨겨져야한다.', () => {
      cy.submitPriceInputForm(LOTTO_PRICE.SUCCESS_TEST_PRICE);
      cy.showToggleButtonClick();
      cy.showToggleButtonClick();
      cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
      cy.get('.lotto-detail').should('not.be.visible');
    });
  });

  describe('결과 확인하기 form 제출 시', () => {
    it('로또 당첨 결과 모달을 보여준다.', () => {
      cy.submitWinningInputForm();
      cy.get('.modal').should('have.class', 'open');
      cy.get('.modal').should('be.visible');
    });
  });

  describe('다시 시작하기 버튼 클릭시', () => {
    it('금액금액입력의 value가 초기화된다.', () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      cy.get('input[name="purchasePrice"]').should('have.value', '');
    });

    it('당첨번호 입력 value가 모두 초기화된다.', () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      for (let i = 1; i < 8; i++) {
        cy.get(`[data-order=${i}]`).should('have.value', '');
      }
      cy.get('input[name="purchasePrice"]').should('have.value', '');
    });

    it('생성됐던 모든 로또 리스트가 삭제된다.', () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      cy.get('#lotto-wrapper-list').children().should('have.length', 0);
    });

    it('번호보기 checkbox를 초기화한다.', () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
    });

    it(`당첨 번호 입력하는 폼을 화면에서 숨김처리한다.`, () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      cy.get('#lotto-winning-number-form').should('not.have.class', 'is-active');
      cy.get('#lotto-winning-number-form').should('not.be.visible');
    });

    it(`modal창을 숨김 처리한다.`, () => {
      cy.submitWinningInputForm();
      cy.clickResetButton();
      cy.get('.modal').should('not.have.class', 'open');
      cy.get('.modal').should('not.be.visible');
    });
  });
});
