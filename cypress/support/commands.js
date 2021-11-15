import CypressDom from '../../src/js/constants/CypressDom'

Cypress.Commands.add('purchaseLotto', (money) => {
  cy.get(`input[data-test-element="${CypressDom.purchaseInput}"]`).type(money)
  cy.get(`button[data-test-element="${CypressDom.purchaseButton}"]`).click()
})

Cypress.Commands.add('toggleButton', () => {
  cy.get(`input[data-test-element="${CypressDom.toggleButton}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('lottoCountShouldBe', (count) => {
  cy.get(`label[data-test-element="${CypressDom.lottoCountLabel}"]`)
    .invoke('attr', 'data-count')
    .should('equal', count + '')
})

Cypress.Commands.add('checkLottoDetailDisplay', (visible) => {
  cy.get(`span[data-test-element="${CypressDom.lottoDetail}"`).should(
    'have.css',
    'display',
    visible ? 'block' : 'none'
  )
})
