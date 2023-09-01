import { SELECTOR, ERRORS, LOTTO_PRICE, WINNING_NUMBER } from '../../src/domain/constants/index.js';

describe('Lotto E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('should successfully loads', () => {
    cy.visit('http://localhost:9000');
  });

  it('should be exist budget Input', () => {
    cy.get(SELECTOR.BUDGET_INPUT).should('exist');
  });

  it('should be exist budget Button', () => {
    cy.get(SELECTOR.BUDGET_BUTTON).should('exist');
  });


  context('Budget Input Test', () => {
    let INPUT, BUTTON, ERROR;

    beforeEach(() => {
      INPUT = cy.get(SELECTOR.BUDGET_INPUT);
      BUTTON = cy.get(SELECTOR.BUDGET_BUTTON);
      ERROR = cy.get(SELECTOR.BUDGET_ERROR);
    });

    it(`won't be able to put less than ${LOTTO_PRICE}`, () => {
      INPUT.type('999');
      BUTTON.should('be.disabled');
      ERROR.then(($value) => {
        const text = $value.text();
        expect(text).to.equal(ERRORS.NOT_ENOUGH_MONEY);
      });
    });

    it(`won't be able to put negative number`, () => {
      INPUT.type('-1');
      BUTTON.should('be.disabled');
      ERROR.then(($value) => {
        const text = $value.text();
        expect(text).to.equal(ERRORS.NOT_POSITIVE_NUMBER);
      });
    });

    it(`should issue 3 lotto tickets with ${LOTTO_PRICE * 3}`, () => {
      INPUT.type(LOTTO_PRICE * 3);
      BUTTON.click();
      cy.get(SELECTOR.LOTTO_TICKET).should('have.length', 3);
    });

    it(`should display issued numbers once toggle checked`, () => {
      INPUT.type(LOTTO_PRICE * 3);
      BUTTON.click();
      cy.get(SELECTOR.LOTTO_TICKET).should('have.length', 3);
      cy.get(SELECTOR.LOTTO_TOGGLE).check({ force: true });
      cy.get(SELECTOR.LOTTO_LIST).should('have.class', 'flex-col');
    });
  });



  context('Winning Number Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:9000');
      cy.get(SELECTOR.BUDGET_INPUT).type(LOTTO_PRICE * 3);
      cy.get(SELECTOR.BUDGET_BUTTON).click();
    });


    it(`should be available to check result once with right input`, () => {
      cy.get('.winning-number').each(($input, index) => {
        cy.wrap($input).type(index + 1);
      })
      cy.get('.bonus-number').type(7);
      cy.get(SELECTOR.WINNING_BUTTON).should('not.be.disabled');
    });

    it(`should validate input`, () => {
      const tests = [
        {
          numbers: [1, 1, 2, 3, 4, 5],
          error: ERRORS.NOT_NUMBER_UNIQUE,
        },
        {
          numbers: [1, 2, 3, 4, 5, 46],
          error: ERRORS.NOT_IN_RANGE,
        },
        {
          numbers: [0, 2, 3, 4, 5, 6],
          error: ERRORS.NOT_IN_RANGE,
        },
        {
          numbers: [1, 2, 3, 4, 5, -1],
          error: ERRORS.NOT_POSITIVE_NUMBER,
        },
      ];

      tests.forEach(({ numbers, error }) => {
        cy.get('.winning-number').each(($input, index) => {
          cy.wrap($input).clear()
        })
        cy.get('.bonus-number').clear();
        cy.get('.winning-number').each(($input, index) => {
          cy.wrap($input).type(numbers[index]);
        })
        cy.get('.bonus-number').type(7);
        cy.get(SELECTOR.WINNING_ERROR).then(($value) => {
          const text = $value.text();
          expect(text).to.equal(error);
        });
      });
    });
  });

  context('Result Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:9000');
      cy.get(SELECTOR.BUDGET_INPUT).type(LOTTO_PRICE * 3);
      cy.get(SELECTOR.BUDGET_BUTTON).click();
      cy.get('.winning-number').each(($input, index) => {
        cy.wrap($input).type(index + 1);
      })
      cy.get('.bonus-number').type(7);
      cy.get(SELECTOR.WINNING_BUTTON).click();
    });

    it(`should display result modal`, () => {
      cy.get(SELECTOR.MODAL).should('have.class', 'open');
    });

    it(`should display result modal with profit rate`, () => {
      cy.get(SELECTOR.MODAL_BODY).then(($value) => {
        const text = $value.text();
        expect(text).to.include('수익률');
      });
    });

    it(`should be able to retry`, () => {
      cy.get(SELECTOR.MODAL_BODY).then(($value) => {
        const text = $value.text();
        expect(text).to.include('수익률');
      });
      cy.get(SELECTOR.RETRY_BUTTON).click();
      cy.get(SELECTOR.MODAL).should('not.have.class', 'open');
      cy.get(SELECTOR.BUDGET_INPUT).then(($value) => $value.val()).should('be.empty');
      cy.get(SELECTOR.BUDGET_BUTTON).should('be.disabled');
    });
  })
 
});
