const $purchaseInput = '[data-cy="purchase-amount"]';
const $purchaseButton = '[data-cy="purchase-button"]';

describe('LOTTO TEST', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('exist price input tag', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.should('exist');
  });

  it('success When valid price of Lotto input', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(1000);
    purchaseInputTag.should('have.value', 1000);
  });

  it('fails When invalid price of Lotto input', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type('1000a');
    purchaseInputTag.should('have.value', 1000);
  });

  it('check valid Price is submitted', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    const VALID_PRICE_ERROR_MSG =
      '로또 구입 금액을 1,000원 단위로 입력해 주세요.';

    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(1234);
    const purchaseButtonTag = cy.get($purchaseButton);
    purchaseButtonTag.click().then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;
      expect(actualMessage).to.equal(VALID_PRICE_ERROR_MSG);
    });
  });
});

// given, when , then 중 THEN 먼저 작성
