
// LINK: https://on.cypress.io/custom-commands
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('typeToTarget', (selector, contents) => {
  return cy.get(selector).type(contents)
})

Cypress.Commands.add('clickTarget', (selector) => {
  return cy.get(selector).click()
})

Cypress.Commands.add('getAndSetAliase', (selector, aliase) => {
  return cy.get(selector).as(aliase)
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
