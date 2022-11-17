import { ERROR_MSSAGE, LOTTO } from '../../src/js/utils/constants.js';
import { getLottoNumbers } from '../../src/js/utils/common.js';

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

  context('valid purchase amount of Lotto in Input tag', () => {
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
  });

  context('check valid Price is submitted', () => {
    it('alert when invalid Price is submitted', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.purchaseLotto(1234).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MSSAGE.AMOUNT);
      })
    });

    it('visible templates when the valid price is submitted', () => {
      cy.purchaseLotto(7000).then(() => {
        cy.get('#purchased-lottos').should('be.visible');
        cy.get('#input-lotto-nums').should('be.visible');
      });
    });
  });

  context('check result of Purchase Lottery', () => {
    it('show total count of lottos', () => {
      cy.purchaseLotto(7000);
      cy.get('#total-purchased').contains('7');
    });

    it('show total images of lottos', () => {
      cy.purchaseLotto(7000);
      cy.get('.lotto-image').should('have.length', 7);
    });
  });

  context('check Lotto Numbers toggle', () => {
    it('checked when toggle on', () => {
      cy.purchaseLotto(9000);
      cy.onToggleLottoNumbers().should('be.checked');
    });

    it('shows the numbers of lottos when toggle on', () => {
      cy.purchaseLotto(8000);
      cy.onToggleLottoNumbers();
      cy.get('.lotto-numbers').should('be.visible');
    });
  });

  context('check that valid Numbers of Lottery is published', () => {
    it('lotto number should be 6 numbers', () => {
      cy.purchaseLotto(7000);
      cy.onToggleLottoNumbers();
      cy.get('.lotto-numbers')
        .first()
        .then(($element) => {
          const lottoNumberText = $element.text();
          const lottoNumbers = lottoNumberText.split(',');
          expect(lottoNumbers.length).to.equal(LOTTO.LENGTH);
        });
    });
  });
});
