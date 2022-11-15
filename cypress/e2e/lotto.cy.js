describe('LOTTO TEST', () => {
  const purchaseInput = '[data-cy="purchase-input"]';
  const purchaseButton = '[data-cy="purchase-button"]'
  beforeEach(() => {
    cy.visit('../../index.html');
  })

  it('success When valid price of Lotto input', () => {
    const purchaseInputTag = cy.get(purchaseInput);
    purchaseInputTag.should('be.visible');
    purchaseInputTag.type(1000);
    purchaseInputTag.should('have.value', 1000);
  })

  it('fails When invalid price of Lotto input', () => {
    const purchaseInputTag = cy.get(purchaseInput);
    purchaseInputTag.should('be.visible');
    purchaseInputTag.type('sdfs');
    purchaseInputTag.should('be.empty');
  })

  it('check valid Price is submitted', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    const VALID_PRICE_ERROR_MSG = '로또 구입 금액을 1,000원 단위로 입력해 주세요.';

    const purchaseInputTag = cy.get(purchaseInput);
    purchaseInputTag.type(1234);
    const purchaseButtonTag = cy.get(purchaseButton);
    purchaseButtonTag.click().then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;
      expect(actualMessage).to.equal(VALID_PRICE_ERROR_MSG);
    });
  });
})
