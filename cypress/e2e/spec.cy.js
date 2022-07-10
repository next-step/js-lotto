import { validateLotto } from '../../src/js/utils/lotto.js';

describe('로또 테스트', () => {
  before(() => {
    cy.visit('/', { timeout: 1000 });
  });

  it('최초 접속했을 경우, 금액 입력창이 비워져 있다.', () => {
    cy.get('#form-amount').within(() => {
      cy.get('input').should('have.value', '');
    });
  });
  it('금액 입력창에 1000원 단위가 아닌 금액을 입력 후 구매한다.', () => {
    const inputAmount = 7777;

    cy.get('#form-amount').within(() => {
      cy.root().then($form => {
        $form.on('submit', e => {
          e.preventDefault();
        });
      });
      cy.get('input').type(inputAmount);
      cy.root().submit();
    });

    cy.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    cy.get('#form-amount').within(() => {
      cy.get('input').should('have.value', '');
    });
  });
  it('1000원 단위 금액 입력 후 구매한다.', () => {
    const inputAmount = 7000;

    cy.get('#form-amount').within(() => {
      cy.get('input').type(inputAmount);
      cy.root().submit();
    });

    cy.get('#lotto-amount').should('have.text', '총 7개를 구매하였습니다.');
    cy.get('.lotto-number').should('have.length', 7);
    cy.get('.lotto-number').each($lottoNumber => {
      const numbers = $lottoNumber
        .text()
        .split(',')
        .map(num => Number(num.trim()));
      validateLotto(numbers);
    });
  });

  it('번호보기 라디오 버튼을 On으로 토글한다.', () => {
    cy.get('.switch').click();

    cy.get('.lotto-number--visible').should('have.length', 7);
  });

  it('번호보기 라디오 버튼을 Off으로 토글한다.', () => {
    cy.get('.switch').click();

    cy.get('lotto-number--visible').should('have.length', 0);
  });
});
