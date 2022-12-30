/// <reference types="cypress" />

describe('로또 구입', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');

    const lottoPurchaseInput = cy.get('[data-test-id="lotto-price-input"]').find('input');
    lottoPurchaseInput.type('10000');

    const lottoPurchaseButton = cy.get('[data-test-id="lotto-price-input"]').find('button');
    lottoPurchaseButton.click();
  });

  it('로또 수동구입 input에 번호를 기입하지 않으면 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('로또 번호를 모두 입력해주세요!');
    });
    const lottoManualPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-manual"]');
    lottoManualPurchaseButton.click();
  });

  it('로또 수동구입 input에 번호를 모두 기입하지 않으면 경고창을 띄운다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('로또 번호를 모두 입력해주세요!');
    });

    const lottoNumberInputs = cy.get('#new-lotto-number-inputs-container').find('input');
    const number = 1;
    lottoNumberInputs.each((el, i) => {
      if (i < 3) {
        cy.wrap(el[0]).type(number + i);
      }
    });

    const lottoManualPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-manual"]');
    lottoManualPurchaseButton.click();
  });

  it('로또를 수동으로 구입했을 경우, 로또 리스트에 1개가 추가되고 로또 1개 값 만큼 잔액에서 빠지고 입력한 번호가 그대로 로또 리스트에 등록되어야한다.', () => {
    const lottoNumberInputs = cy.get('#new-lotto-number-inputs-container').find('input');
    const number = 1;
    lottoNumberInputs.each((el, i) => cy.wrap(el[0]).type(number + i));

    const lottoManualPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-manual"]');
    lottoManualPurchaseButton.click();

    cy.get('#balance').should('have.text', '9000');

    cy.get('#lotto-switch').parent().click();
    cy.get('#lotto-count').should('have.text', '총 1개를 구매하였습니다.');
    cy.get('[data-test-id="lotto-table"]').should('have.length', 1);
    cy.get('[data-test-id="lotto-table"]').children().each((el, i) => {
      const element = cy.wrap(el[0]);
      element.should('have.text', '🎟️ 1, 2, 3, 4, 5, 6, 7');
    });
  });

  it('자동 구매 버튼 클릭 시, 잔액만큼의 로또를 구입하고 자동으로 로또를 생성해준다.', () => {
    const lottoAutoPurchaseButton = cy.get('[data-test-id="lotto-purchase-button-auto"]');
    lottoAutoPurchaseButton.click();

    cy.get('#balance').should('have.text', '0');

    cy.get('#lotto-count').should('have.text', '총 10개를 구매하였습니다.');
    cy.get('[data-test-id="lotto-table"]').children().children().should('have.length', 10);
  });
});
