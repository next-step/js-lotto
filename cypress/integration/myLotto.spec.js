/// <reference types="cypress" />

describe('My Lotto Input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();
  });

  it('내 복권 번호를 모두 입력해야 한다.', () => {
    const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
    const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
    lottoSubmitButton.click();

    cy.get('[data-test-id="modal"]').should('not.be.visible');
  });

  it('복권 번호들은 중복되어선 안된다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    });

    const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
    lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type('2'));
    const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
    lottoSubmitButton.click();

    cy.get('[data-test-id="modal"]').should('not.be.visible');
  });

  it('복권 번호 2자리를 입력하면 그 다음 Input으로 focus되어야 한다.', () => {
    const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
    lottoNumberInputsContainer.find('input').first().type('32').next().should('be.focused');
  });

  it('결과 확인하기를 누르면 결과 모달을 띄워 결과를 보여준다.', () => {
    const lottoNumberInputsContainer = cy.get('[data-test-id="lotto-number-inputs-container"]');
    let counter = 1;
    lottoNumberInputsContainer.find('input').each((el) => cy.wrap(el).type(counter++));
    const lottoSubmitButton = cy.get('[data-test-id="lotto-result-submit-button"]');
    lottoSubmitButton.click();

    cy.get('[data-test-id="modal"]').should('be.visible');
  });
});
