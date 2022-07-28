import { LOTTO_MAX_NUMBER, LOTTO_PER_PRICE } from '../../src/js/consts';
import { TEST_TICKET_NUMBER } from './lottoModule.cy.js';

describe('로또 당첨결과', () => {
  context('당첨 결과 확인', () => {
    before(() => {
      cy.visit('http://127.0.0.1:8080');
    });
    it('결과 확인하기 버튼을 누르면 당첨 통계와 수익률을 확인할 수 있다.', () => {
      cy.get('input.money-input').type(
        `${LOTTO_PER_PRICE * TEST_TICKET_NUMBER}`
      );
      cy.get('button[id=lotto-auto-buying-btn]').click();
      cy.get('input.winning-number').each(($el, index) => {
        cy.wrap($el).type(`${index + 1}`);
      });
      cy.get('input.bonus-number').type(`${LOTTO_MAX_NUMBER}`);
      cy.get('button.open-result-modal-button').click();
      cy.get('tbody.winning-result-body')
        .children('.text-center')
        .should('have.length', 5);
      cy.get('p.rate-of-profit').should('contain.html', '당신의 총 수익률은');
    });
    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
      cy.get('button[id=lotto-data-reset]').click();
      cy.get('input.money-input').should('contain.value', '');
      cy.get('input.bonus-number').should('contain.value', '');
      cy.get('div.modal.open').should('have.length', 0);
      cy.get('section.auto-buy-section.hidden').should('have.length', 1);
      cy.get('form[id=winning-numbers-form].hidden').should('have.length', 1);
    });
  });
});
