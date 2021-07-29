// https://on.cypress.io/custom-commands

const getAppShadowRoot = () => cy.get('lotto-app').shadow()

Cypress.Commands.add('getLottoApp', () => getAppShadowRoot().find('[data-cy="lotto-app"]'))
Cypress.Commands.add('getOrderForm', () =>
  getAppShadowRoot().find('order-form').shadow().find('[data-cy="order-form"]'),
)
Cypress.Commands.add('getTicketSection', () =>
  getAppShadowRoot().find('ticket-section').shadow().find('[data-cy="ticket-section"]'),
)
Cypress.Commands.add('getResultForm', () =>
  getAppShadowRoot().find('result-form').shadow().find('[data-cy="result-form"]'),
)
