Cypress.Commands.add('getInputPriceForm', () => {
  cy.get(`[data-test="input-price-form"]`);
});

Cypress.Commands.add('getInputPrice', () => {
  cy.get(`[data-test="input-price"]`);
});

Cypress.Commands.add('getPurchasedLottos', () => {
  cy.get(`[data-test="purchased-lottos"]`);
});

Cypress.Commands.add('getLottoSwitchToggle', () => {
  cy.get(`[data-test="lotto-switch"]`);
});

Cypress.Commands.add('getLottoIcons', () => {
  cy.get(`[data-test="lotto-icon"]`);
});

Cypress.Commands.add('getLottoDetails', () => {
  cy.get(`[data-test="lotto-detail"]`);
});

Cypress.Commands.add('getInputLottoNumberForm', () => {
  cy.get(`[data-test="input-lotto-nums-form"]`);
});
