Cypress.Commands.add('getByCydata', (selector) => {
	cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('checkInvalidInput', () => {
	cy.get('input:invalid').should('have.length', 1);
});
