Cypress.Commands.add('getInputPriceForm', () => {
  cy.get(`[data-test="input-price-form"]`);
});

Cypress.Commands.add('getInputPrice', () => {
  cy.get(`[data-test="input-price"]`);
});

Cypress.Commands.add('getLottos', () => {
  cy.get(`[data-test="lottos"]`);
});

Cypress.Commands.add('getLottoSwitchToggle', () => {
  cy.get(`[data-test="lotto-swtich"]`);
});
