/// <reference types="cypress" />

describe('purchase Lotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')
  });

  it('로또 구입 금액을 입력하면 금액에 해당하는 로또를 발급해야 하고 내 로또 입력창이 나와야한다.', () => {
    const lottoPurchase = cy.get('[data-test-id="lotto-purchase"]');
    const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
    lottoPurchase.should('be.visible');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();

    cy.get('[data-test-id="lotto-list"]').should('be.visible');
    cy.get('[data-test-id="lotto-input"]').should('be.visible');
    cy.get('[data-test-id="lotto-table"]').children().children().should('have.length', 10);
  });

  it('로또 구입 금액은 1000원 단위만 가능하고 다른 값 입력시 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('구입 가격은 1000 단위로만 입력해주세요!');
    });

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-purchase-input"]');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button"]');
    lottoPurchaseInput.type('12343');
    lottoPurchaseButton.click();

    cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
    cy.get('[data-test-id="lotto-input"]').should('not.be.visible');
  });
});
