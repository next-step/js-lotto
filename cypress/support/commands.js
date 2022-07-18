Cypress.Commands.add('fillWinningNumbers', (lottoNumbers, bonusNumber) => {
  lottoNumbers.forEach((number, index) => {
    cy.get(`input[name=lotto-number-${index + 1}]`).type(number);
  })
  cy.get('.bonus-number').type(bonusNumber);
})
