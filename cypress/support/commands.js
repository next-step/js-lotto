// @ts-nocheck
/* form-price */
Cypress.Commands.add('inputPrice', number => {
  cy.get('form-price input[type=number]').type(number)
  cy.get('form-price form').submit()
})

/* form-details */
const fillNumbers = numbers => ($el, i) => {
  if (numbers[i]) cy.wrap($el).type(numbers[i])
}
Cypress.Commands.add('detailEntries', () => cy.get('detail-entry'))
Cypress.Commands.add('detailEntry', index => cy.detailEntries().eq(index))
Cypress.Commands.add('detailEntryInputs', index => cy.detailEntry(index).find('input[type=number]'))
Cypress.Commands.add('fillDetailEntry', (index, numbers) => {
  cy.detailEntryInputs(index).each(fillNumbers(numbers))
})
Cypress.Commands.add('toggleDetailEntry', index => {
  cy.detailEntry(index).find('[type="checkbox"]').first()
})
Cypress.Commands.add('randomDetailEntry', (index, numbers) => {
  const $entry = cy.detailEntry(index)
  if (numbers && numbers.length) {
    $entry.find('input[type="number"]').each(fillNumbers(numbers))
  }
  $entry.find('[type="checkbox"]').first().check()
})
Cypress.Commands.add('getDetailEntryCheckbox', index => {
  return cy.detailEntry(index).find('input[type="checkbox"]').first()
})
Cypress.Commands.add('detailEntriesToggleAll', () => {
  return cy.get('form-details .input-toggle-all').first()
})
Cypress.Commands.add('detailEntriesSubmit', () => cy.get('form-details .btn-submit').first().click())

/* form-winning */
Cypress.Commands.add('fillWinningNumbers', numbers => {
  cy.get('form-winning input[type="number"]').each(($el, i) => {
    cy.wrap($el).type(numbers[i])
  })
  cy.get('form-winning form').submit()
})
