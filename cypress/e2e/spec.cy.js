import { PAYMENT_UNIT } from '../../src/js/constants/common.js';

describe('로또 생성 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('최초 접속했을 경우, 금액 입력창이 비워져 있다.', () => {
    cy.get('#input-amount').should('have.value', '');
  });

  it('금액 입력창에 1000원 단위가 아닌 금액을 입력 후 구매한다.', () => {
    const inputAmount = 7777;

    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    cy.get('#input-amount').should('have.value', '');
  });

  it('1000원 단위 금액 입력 후 구매한다.', () => {
    const inputAmount = 7000;
    const lottoCount = inputAmount / PAYMENT_UNIT;

    cy.get('#form-amount').within(() => {
      cy.get('input').type(inputAmount);
      cy.root().submit();
    });

    cy.get('#lotto-amount').should('have.text', `총 ${lottoCount}개를 구매하였습니다.`);
    cy.get('.lotto-number').should('have.length', lottoCount);
  });

  it('번호보기 라디오 버튼을 On으로 토글하면, 구매한 로또의 번호를 확인할 수 있다.', () => {
    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.get('.switch').click();

    cy.get('.lotto-number--visible').should('have.length', 7);
  });

  it('번호보기 라디오 버튼을 Off로 토글하면, 구매한 로또의 번호를 확인할 수 없다.', () => {
    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();
    cy.get('.switch').click();

    cy.get('.switch').click();

    cy.get('lotto-number--visible').should('have.length', 0);
  });
});
