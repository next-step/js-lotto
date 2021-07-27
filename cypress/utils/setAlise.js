const setAliase = () => {
  cy.getAndSetAliase('#price-form', 'pf')
  cy.getAndSetAliase('#price-form input', 'pfInput')
  cy.getAndSetAliase('#price-form button', 'pfBtn')

  cy.getAndSetAliase('#lottos', 'lottos')
  cy.getAndSetAliase('#lottos ul', 'lottoList')
  // cy.getAndSetAliase('.lotto-numbers-toggle-button', 'tog')
  cy.getAndSetAliase('#lottos .switch', 'tog')

  cy.getAndSetAliase('#winning-number', 'wf')
  cy.getAndSetAliase('#winning-number input', 'wfInputs');
  cy.getAndSetAliase('#winning-number button', 'wfBtn');

  cy.getAndSetAliase('#modal', 'mo');
  cy.getAndSetAliase('#modal .close-x', 'moClose');
  cy.getAndSetAliase('#modal .retry-btn', 'moRetry');
}

export default setAliase;