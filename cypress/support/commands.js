Cypress.Commands.add('fillWinningNumbers', (lottoNumbers, bonusNumber) => {
  lottoNumbers.forEach((number, index) => {
    cy.get(`input[name=lotto-number-${index + 1}]`).type(number);
  })
  cy.get('.bonus-number').type(bonusNumber);
})

Cypress.Commands.add('chargeMoney', (money) => {
  cy.get('input[name=purchase-amount]').type(money);
})
