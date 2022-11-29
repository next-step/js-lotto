import { ERROR_MESSAGE } from '../../src/js/constants/index.js';

describe('당첨 번호 & 보너스 번호 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
    cy.clickPurchaseBtn(3000);
  });

  it('당첨 번호와 보너스 번호를 입력할 수 있는 input이 존재한다.', () => {
    cy.get('.winning-number').should('have.length', 6);
    cy.get('.bonus-number').should('exist');
  });

  it('결과 확인하기 버튼이 존재한다.', () => {
    cy.get('.open-result-modal-btn').should('exist');
  });

  context('당첨 번호 6개와 보너스 번호 1개는 1 ~ 45 중 중복되지 않은 7개의 수이다.', () => {
    const alertInvalidNumbers = (errorMessage) => {
      const alertStub = cy.stub();

      cy.on('window:alert', alertStub);
      cy.get('.open-result-modal-btn')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(errorMessage);
        });
    };

    const INVALID_CASE = {
      EMPTY: { winningNumbers: [1, 3, 7, 5, 2], bonus: 10 },
      INVALID_WINNING_NUMBER_WITHIN_RANGE: { winningNumbers: [1, 0, 7, 4, 5, 2], bonus: 10 },
      INVALID_BONUS_WITHIN_RANGE: { winningNumbers: [1, 27, 7, 4, 5, 2], bonus: 47 },
      DUPLICATED: { winningNumbers: [1, 1, 7, 4, 5, 2], bonus: 1 },
    };

    it('당첨 번호와 보너스 번호 input에 하나라도 입력하지 않으면 alert 창이 뜬다.', () => {
      const { winningNumbers, bonus } = INVALID_CASE.EMPTY;

      cy.get('.winning-number').each(($ele, idx) => {
        if (idx === 5) return;
        cy.get($ele).type(winningNumbers[idx]);
      });
      cy.get('.bonus-number').type(bonus);

      alertInvalidNumbers(ERROR_MESSAGE.INVALID_NUMBER_WITHIN_RANGE);
    });

    it('당첨 번호가 1 ~ 45 사이의 수가 아니면 alert 창이 뜬다.', () => {
      cy.typeWinningNumbersAndBonus(INVALID_CASE.INVALID_WINNING_NUMBER_WITHIN_RANGE);

      alertInvalidNumbers(ERROR_MESSAGE.INVALID_NUMBER_WITHIN_RANGE);
    });

    it('보너스 번호가 1 ~ 45 사이의 수가 아니면 alert 창이 뜬다.', () => {
      cy.typeWinningNumbersAndBonus(INVALID_CASE.INVALID_BONUS_WITHIN_RANGE);

      alertInvalidNumbers(ERROR_MESSAGE.INVALID_NUMBER_WITHIN_RANGE);
    });

    it('당첨 번호와 보너스 번호 중 중복되는 숫자가 있으면 alert창이 뜬다', () => {
      cy.typeWinningNumbersAndBonus(INVALID_CASE.DUPLICATED);

      alertInvalidNumbers(ERROR_MESSAGE.DUPLICATED_NUMBER);
    });
  });
});

describe('모달창 테스트', () => {
  const PRICE_INPUT = 3000;
  const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
  const BONUS = 7;

  const openModalTest = () => {
    cy.visit('../../index.html');

    cy.clickPurchaseBtn(PRICE_INPUT);
    cy.typeWinningNumbersAndBonus({ winningNumbers: WINNING_NUMBERS, bonus: BONUS });

    cy.get('.open-result-modal-btn').click();
  };

  context('결과 확인하기 버튼 기능 테스트', () => {
    before(() => {
      openModalTest();
    });

    it('결과 확인하기 버튼을 누르면 모달창이 뜬다.', () => {
      cy.get('.modal').should('be.visible');
    });

    it('모달창에서 당첨 갯수를 확인할 수 있다.', () => {
      cy.get('.winning-count').each(($ele) => {
        cy.get($ele).invoke('text').should('match', /[0-9]/);
      });
    });

    it('모달창에서 수익률을 확인할 수 있다.', () => {
      cy.get('.profit-rate-result').invoke('text').should('match', /[0-9]/);
    });
  });

  context('모달창의 다시 시작하기 버튼을 누르면 초기화된다.', () => {
    before(() => {
      openModalTest();

      cy.get('.restart-btn').click();
    });

    it('모달창이 화면에 보이지 않는다.', () => {
      cy.get('.modal').should('not.be.visible');
    });

    it('로또 그림과 당첨 번호 input이 화면에 보이지 않는다.', () => {
      cy.get('.purchased-result').each(($ele) => {
        cy.get($ele).should('not.be.visible');
      });
    });

    it('입력한 로또 구입 금액은 초기화된다.', () => {
      cy.get('.purchasing-lotto-input').should('have.value', '');
    });
  });

  context('모달창의 x 버튼을 누르면 모달창 뜨기 이전 화면으로 돌아간다.', () => {
    before(() => {
      openModalTest();

      cy.get('.modal-close').click();
    });

    it('모달창이 화면에 보이지 않는다.', () => {
      cy.get('.modal').should('not.be.visible');
    });

    it('로또 그림과 당첨 번호 input이 화면에 보인다.', () => {
      cy.get('.purchased-result').each(($ele) => {
        cy.get($ele).should('be.visible');
      });
    });

    it('입력한 로또 구입 금액은 유지된다.', () => {
      cy.get('.purchasing-lotto-input').should('have.value', PRICE_INPUT);
    });

    it('입력한 당첨 번호와 보너스 번호는 유지된다.', () => {
      cy.get('.winning-number').each(($ele, idx) => {
        cy.get($ele).should('have.value', WINNING_NUMBERS[idx]);
      });
      cy.get('.bonus-number').should('have.value', BONUS);
    });
  });
});
