const { ERROR_MESSAGE } = require('../../src/js/utils/constants.js')

describe('Lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });
  it('input amount & visible lottoList', () => {
    cy.get('#inputAmount').type('1000');
    cy.get('#amountBtn').click();
    // cy.get('.lotto-numbers-toggle-button').click();
    cy.get('.lotto-numbers-toggle-button').parent().click();
    cy.get('#lottoList').should('be.visible');
  })
  it('check winning numbers', () => {
    cy.get('.winning-number').each(($input) => {
      cy.wrap($input).type('12');
      cy.wrap($input).should('have.value', '12');
    });
  });

  it('check bonus number', () => {
    cy.get('.bonus-number').type('7');
    cy.get('.bonus-number').should('have.value', '7');
  });
  it('check winning numbers within range', () => {
    cy.get('.winning-number').each(($input) => {
      cy.wrap($input).type('100');
      cy.wrap(() => {
        expect(checkWinningNumbers([$input.val()])).to.throw(ERROR_MESSAGE.NUMBER_OVER_LIMIT);
      }).should('throw');
    });
  });

  it('check for duplicate winning numbers', () => {
    const duplicateNumbers = ['12', '15', '12', '1', '2', '3', '4'];

    cy.get('.winning-number').each(($input, index) => {
      cy.wrap($input).type(duplicateNumbers[index]);
    });

    const uniqueNumbers = [...new Set(duplicateNumbers)];
    cy.get('.winning-number').each(($input, index) => {
      const inputValue = uniqueNumbers[index];
      cy.wrap($input)
        // .should('have.value', '12')
        .then(($input) => {
          if (inputValue !== $input.val()) {
            throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBERS);
          }
        });
    });
  });

  it('open the result modal', () => {
    cy.get('.winning-number').each(($input, index) => {
      cy.wrap($input).type(index + 1);
    });
    cy.get('.bonus-number').type('6');
    cy.get('.open-result-modal-button').click();
    cy.get('#myModal').should('be.visible');
  });
})