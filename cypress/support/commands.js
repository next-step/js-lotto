// @ts-nocheck
Cypress.Commands.add('inputPrice', number => {
  cy.get('form-price input[type=number]').type(number)
  cy.get('form-price form').submit()
})

Cypress.Commands.add('pickedItems', () => cy.get('purchased-info ul[data-cy="picked-list"]').children())
