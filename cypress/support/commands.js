const $purchaseInputSelector = '[data-cy="purchase-amount"]';

Cypress.Commands.add('purchaseLotto', (amount) => {
    const purchaseInputTag = cy.get($purchaseInputSelector);
    purchaseInputTag.type(amount);
    cy.get('#input-price-form').submit();
})

Cypress.Commands.add('onToggleLottoNumbers', () => {
    cy.get('.lotto-numbers-toggle-button').check({ force: true });
})
