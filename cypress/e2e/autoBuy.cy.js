import { LOTTO_PER_PRICE } from '../../src/js/consts';
describe('로또 자동구매', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080');
  });
  context('로또 자동생성 에러', () => {
    beforeEach(() => {
      cy.get('.money-input').clear();
    });
    it(`구입 금액이 ${LOTTO_PER_PRICE}보다 작을경우, 로또 발급이 되지 않는다.`, () => {
      cy.get('input.money-input').type(`${LOTTO_PER_PRICE - 1}`);
      cy.get('button[id=lotto-auto-buying-btn]').click();
      cy.get('input.money-input:invalid').should('have.length', 1);
    });
    it('구입 금액이 천단위 이하가 있을경우, alert를 띄운다', () => {
      cy.get('.money-input').type('2001');
      cy.get('button[id=lotto-auto-buying-btn]').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          `lotto 금액은 ${LOTTO_PER_PRICE}원 단위로 입력해야 합니다.`
        );
      });
    });
  });
  context('로또 자동생성 정상발급', () => {
    beforeEach(() => {
      cy.get('.money-input').clear();
    });
    it('로또 자동생성으로 정상발급이 가능하다.', () => {
      cy.get('input.money-input').type(`${LOTTO_PER_PRICE * 2}`);
      cy.get('button[id=lotto-auto-buying-btn]').click();
      cy.get('li.lotto-ticket-set').should('have.length', 2);
    });
    it('번호보기 토글로 자동생성된 로또번호를 보거나 가릴 수 있다.', () => {
      cy.get('.lotto-result').then(($lottoResult) => {
        expect($lottoResult.is(':visible')).to.equal(false);
      });
      cy.get('.lotto-numbers-toggle-button').click({ force: true });
      cy.get('.lotto-result').then(($lottoResult) => {
        expect($lottoResult.is(':visible')).to.equal(true);
      });
      cy.get('.lotto-numbers-toggle-button').click({ force: true });
      cy.get('.lotto-result').then(($lottoResult) => {
        expect($lottoResult.is(':visible')).to.equal(false);
      });
    });
  });
});
