import {
  LOTTO_NUMBER_RANGE_MAX,
  LOTTO_NUMBER_RANGE_MIN,
  LOTTO_PURCHASE_UNIT,
  MESSAGE_FOR_INVALID_WINNING_NUMBERS,
} from '../../src/js/constants.js';

describe('로또 어플리케이션 단계2', () => {
  const getPurchaseAmount = () => cy.get('[data-cy="purchase-amount"]');
  const getPurchaseButton = () => cy.get('[data-cy="purchase-button"]');
  const getWinningNumberInputsForm = () => cy.get('[data-cy="winning-number-inputs"]');
  const getWinningNumberInputs = () => cy.get('.winning-number');
  const getBonusNumberInput = () => cy.get('.bonus-number');
  const getShowingResultButton = () => cy.get('#showResultButton');
  const getResultModal = () => cy.get('#resultModal');
  const getProfitRatio = () => cy.get('#profitRatio');
  const getReplayButton = () => cy.get('#replayButton');

  const purchaseLottos = (amount = LOTTO_PURCHASE_UNIT) => {
    getPurchaseAmount().type(`${amount}`);
    getPurchaseButton().click();
  };

  beforeEach(() => {
    cy.visit('/');
    purchaseLottos(3000);
  });

  describe('당첨 번호 및 보너스 입력 폼을 확인한다.', () => {
    it('입력할 form과 input 태그들이 존재한다.', () => {
      getWinningNumberInputsForm().should('exist');
      getWinningNumberInputs().should('have.length', 6);
      getBonusNumberInput().should('exist');
    });

    it('각 당첨번호는 숫자만 입력이 가능하며, 문자 입력이 불가능하다.', () => {
      getWinningNumberInputs().each(($el) => {
        cy.wrap($el).type('1a').should('have.value', '1');
        cy.wrap($el).clear();
        cy.wrap($el).type('abc').should('have.value', '');
      });
      getBonusNumberInput().type('1a').should('have.value', '1');
      getBonusNumberInput().clear();
      getBonusNumberInput().type('ab').should('have.value', '');
    });

    it('각 당첨번호 input에 0 또는 45초과의 값을 입력 후 결과 확인하기 버튼을 클릭 시 submit이 되지 않는다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        if (index % 2 === 0) {
          cy.wrap($el)
            .type(`${LOTTO_NUMBER_RANGE_MIN - 1}`)
            .should('have.value', `${LOTTO_NUMBER_RANGE_MIN - 1}`);
        } else {
          cy.wrap($el)
            .type(`${LOTTO_NUMBER_RANGE_MAX + 1}`)
            .should('have.value', `${LOTTO_NUMBER_RANGE_MAX + 1}`);
        }
      });
      getBonusNumberInput().type(`${LOTTO_NUMBER_RANGE_MIN - 1}`);
      getShowingResultButton().click();
      cy.get('#winningNumberInputs :invalid').should('have.length', 7);
    });

    it(`이미 입력한 번호는 재입력이 불가능하며, ${MESSAGE_FOR_INVALID_WINNING_NUMBERS} 경고를 띄운다.`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      getWinningNumberInputs().each(($el, idx) => {
        cy.wrap($el)
          .type(`${idx + 1}`)
          .should('have.value', `${idx + 1}`);
      });
      getBonusNumberInput().type('1').should('have.value', '1');
      getShowingResultButton()
        .click()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(MESSAGE_FOR_INVALID_WINNING_NUMBERS);
        });
    });

    it('1부터 45 이하의 중복되지 않은 값의 입력이 가능합니다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        cy.wrap($el)
          .type(`${index + 1}`)
          .should('have.value', `${index + 1}`);
      });
      getBonusNumberInput()
        .type(`${LOTTO_NUMBER_RANGE_MAX}`)
        .should('have.value', `${LOTTO_NUMBER_RANGE_MAX}`);
      getShowingResultButton().click();
      cy.get('#winningNumberInputs :invalid').should('have.length', 0);
    });
  });

  describe('결과 확인하기 버튼 클릭 시 모달 및 결과가 표시된다.', () => {
    it('1부터 45 이하의 중복되지 않은 값의 입력후 결과 확인 버튼을 누르면 결과 모달이 뜬다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        cy.wrap($el)
          .type(`${index + 1}`)
          .should('have.value', `${index + 1}`);
      });
      getBonusNumberInput()
        .type(`${LOTTO_NUMBER_RANGE_MAX}`)
        .should('have.value', `${LOTTO_NUMBER_RANGE_MAX}`);
      getShowingResultButton().click();
      cy.get('#winningNumberInputs :invalid').should('have.length', 0);
      getResultModal().should('be.visible');
    });

    it('일치 갯수 3개, 4개, 5개, 5개 + 보너스, 6개 당첨 갯수를 나타내는 요소가 존재한다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        cy.wrap($el)
          .type(`${index + 1}`)
          .should('have.value', `${index + 1}`);
      });
      getBonusNumberInput()
        .type(`${LOTTO_NUMBER_RANGE_MAX}`)
        .should('have.value', `${LOTTO_NUMBER_RANGE_MAX}`);
      getShowingResultButton().click();
      cy.get('#place5').should('exist');
      cy.get('#place4').should('exist');
      cy.get('#place3').should('exist');
      cy.get('#place2').should('exist');
      cy.get('#place1').should('exist');
    });
    it('수익률을 나타내는 요소가 존재한다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        cy.wrap($el)
          .type(`${index + 1}`)
          .should('have.value', `${index + 1}`);
      });
      getBonusNumberInput()
        .type(`${LOTTO_NUMBER_RANGE_MAX}`)
        .should('have.value', `${LOTTO_NUMBER_RANGE_MAX}`);
      getShowingResultButton().click();
      getProfitRatio().should('exist');
    });
  });

  describe('다시 시작하기 버튼을 누르면 새로 게임을 재시작한다.', () => {
    it('다시 시작하기 버튼이 존재한다.', () => {
      getWinningNumberInputs().each(($el, index) => {
        cy.wrap($el)
          .type(`${index + 1}`)
          .should('have.value', `${index + 1}`);
      });
      getBonusNumberInput()
        .type(`${LOTTO_NUMBER_RANGE_MAX}`)
        .should('have.value', `${LOTTO_NUMBER_RANGE_MAX}`);
      getShowingResultButton().click();
      getReplayButton().should('exist');
    });
  });
});
