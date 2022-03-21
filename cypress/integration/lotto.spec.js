import { LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE, LOTTO_NUMBER_COUNT } from '../../src/js/constants.js';

describe('로또 구매 시', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('구매 전에는 발급된 로또 영역이 노출되지 않는다.', () => {
    cy.get('.lotto-list-container').should('not.visible');
  });

  it('구매 전에는 결과 확인하기 입력 폼 영역이 노출되지 않는다.', () => {
    cy.get('.lotto-winning-form').should('not.visible');
  });

  it('구매 금액이 1,000원 단위가 아닌 경우 사용자 경고 메세지를 출력한다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('.lotto-buy-price-input').type('1108');
    cy.get('.lotto-buy-submit-button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(LOTTO_PRICE_UNIT_NOT_MATCH_MESSAGE);
      });
  });

  it('구매 금액에 맞게 로또가 발급된다.', () => {
    cy.get('.lotto-buy-price-input').type('2000');
    cy.get('.lotto-buy-submit-button').click();
    cy.get('.lotto-list-count').should('have.text', '2');
    cy.get('.lotto-item').should('have.length', 2);
  });

  it('번호보기 토글 버튼을 클릭하면 복권 번호를 확인할 수 있다.', () => {
    cy.get('.lotto-buy-price-input').type('3000');
    cy.get('.lotto-buy-submit-button').click();
    cy.get('.switch').click();
    cy.get('.lotto-number').should('have.length', 3);
  });

  it('번호보기 토글 버튼을 끄면하면 복권 번호가 감춰진다..', () => {
    cy.get('.lotto-buy-price-input').type('3000');
    cy.get('.lotto-buy-submit-button').click();
    cy.get('.switch').click();
    cy.get('.switch').click();
    cy.get('.lotto-number').should('have.length', 0);
  });

  it('로또 번호는 중복되지 않는다.', () => {
    cy.get('.lotto-buy-price-input').type('3000');
    cy.get('.lotto-buy-submit-button').click();
    cy.get('.switch').click();
    cy.get('.lotto-number').then(($elements) => {
      Cypress.$.makeArray($elements).forEach(($element) => {
        const numbersRemoveDuplication = new Set($element.textContent.split(','));
        expect(numbersRemoveDuplication.size).to.eq(LOTTO_NUMBER_COUNT);
      });
    });
  });

  it('로또 번호는 7개여야 한다.', () => {
    cy.get('.lotto-buy-price-input').type('3000');
    cy.get('.lotto-buy-submit-button').click();
    cy.get('.switch').click();
    cy.get('.lotto-number').then(($elements) => {
      Cypress.$.makeArray($elements).forEach(($element) => {
        const numbers = $element.textContent.split(',');
        expect(numbers.length).to.eq(7);
      });
    });
  });
});
