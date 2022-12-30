/// <reference types="cypress" />

describe('Result Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-price-input"]').find('input');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-price-input"]').find('button');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();

    const lottoAutoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-auto"]');
    lottoAutoPurchaseButton.click();

    const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
    let counter = 1;
    lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type(counter++));
    const lottoSubmitButton = cy.get('[data-test-id="lotto-input"]').find('button');
    lottoSubmitButton.click();
  });

  it('모달의 x버튼을 누르면 모달은 사라진다.', () => {
    const modalCloseButton = cy.get('[data-test-id="modal-close-button"]');
    modalCloseButton.click();

    cy.get('[data-test-id="modal"]').should('not.be.visible');
  });

  it('다시 시작하기를 누르면 모든 input들이 초기화 되고 처음 상태로 돌아간다.', () => {
    const resetButton = cy.get('[data-test-id="reset-button"]');
    resetButton.click();

    cy.get('[data-test-id="modal"]').should('not.be.visible');
    cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
    cy.get('[data-test-id="lotto-input"]').should('not.be.visible');

    cy.get('[data-test-id="lotto-price-input"]').should('be.visible');
    cy.get('[data-test-id="lotto-price-input"]').get('input').should('have.value', '');
  });
});
