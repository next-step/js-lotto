/// <reference types="cypress" />

describe('input Lotto price', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/')
  });

  it('로또 구입 금액을 입력하면 로또 구입창이 나와야 하고 내 로또 입력창이 나와야한다.', () => {
    const lottoPurchase = cy.get('[data-test-id="lotto-price-input"]');
    const lottoPurchaseInput = cy.get('[data-test-id="lotto-price-input"]').find('input');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-price-input"]').find('button');
    lottoPurchase.should('be.visible');
    lottoPurchaseInput.type('10000');
    lottoPurchaseButton.click();

    cy.get('[data-test-id="lotto-list"]').should('be.visible');
    cy.get('[data-test-id="lotto-input"]').should('be.visible');
    cy.get('[data-test-id="lotto-purchase"]').should('be.visible');
  });

  it('로또 구입 금액은 1000원 단위만 가능하고 다른 값 입력시 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('구입 가격은 1000 단위로만 입력해주세요!');
    });

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-price-input"]').find('input');
    const lottoPurchaseButton = cy.get('[data-test-id="lotto-price-input"]').find('button');
    lottoPurchaseInput.type('12343');
    lottoPurchaseButton.click();

    cy.get('[data-test-id="lotto-list"]').should('not.be.visible');
    cy.get('[data-test-id="lotto-input"]').should('not.be.visible');
  });
});
