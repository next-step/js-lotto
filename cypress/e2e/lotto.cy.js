import { ERROR_MSSAGE, LOTTO } from '../../src/js/utils/constants.js';
const $purchaseInput = '[data-cy="purchase-amount"]';
const $purchaseButton = '[data-cy="purchase-button"]';

describe('TEST LOTTO APLICATION', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('exist purchase input tag', () => {
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

    const purchaseInputTag = cy.get($purchaseInput);
    const purchaseButtonTag = cy.get($purchaseButton);

    purchaseInputTag.type(1234);

    purchaseButtonTag.click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MSSAGE.AMOUNT);
    });
  });

  it('show component when the valid price is submitted', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    const purchaseButtonTag = cy.get($purchaseButton);

    purchaseInputTag.type(1000);
    purchaseButtonTag.click().then(() => {
      cy.get('#purchased-lottos').should('be.visible');
      cy.get('#input-lotto-nums').should('be.visible');
    });
  });

  it('show total count of lottos', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    const purchaseButtonTag = cy.get($purchaseButton);

    purchaseInputTag.type(7000);
    purchaseButtonTag.click();
    cy.get('#total-purchased').contains('7');
  });

  it('show total images of lottos', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(7000);
    cy.get('#input-price-form').submit();

    cy.get('.lotto-image').should('have.length', 7);
  });

  it('value true when toggle on', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(7000);
    cy.get('#input-price-form').submit();

    cy.get('.lotto-numbers-toggle-button')
      .check({ force: true })
      .should('be.checked');
  });

  it('shows the numbers of lottos when toggle on', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(7000);
    cy.get('#input-price-form').submit();

    cy.get('.lotto-numbers-toggle-button').check({ force: true });
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('lotto number should be 6 numbers', () => {
    const purchaseInputTag = cy.get($purchaseInput);
    purchaseInputTag.type(7000);
    cy.get('#input-price-form').submit();

    cy.get('.lotto-numbers-toggle-button').check({ force: true });
    cy.get('.lotto-numbers')
      .first()
      .then(($element) => {
        const lottoNumberText = $element.text();
        const lottoNumbers = lottoNumberText.split(',');
        expect(lottoNumbers.length).to.equal(LOTTO.LENGTH);
      });
  });
});
