// @ts-nocheck
Cypress.Commands.add('inputPrice', number => {
  cy.get('form-price input[type=number]').type(number)
  cy.get('form-price form').submit()
})

Cypress.Commands.add('pickedItems', () => cy.get('purchased-info ul[data-cy="picked-list"]').children())

Cypress.Commands.add('fillWinningNumbers', numbers => {
  cy.get('form-winning input[type="number"]').each(($el, i) => {
    cy.wrap($el).type(numbers[i])
  })
  cy.get('form-winning form').submit()
})
