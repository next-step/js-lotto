import { generateRandomNumber } from '../../src/js/lotto';

Cypress.Commands.add('getByCydata', (selector) => {
	cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('checkInvalidInput', (cySelector, msg) => {
	cy.getByCydata(cySelector).invoke('prop', 'validationMessage').should('equal', msg);
});

Cypress.Commands.add('typeMultiInput', (elements) => {
	[...elements].forEach((e) => {
		const number = generateRandomNumber();
		cy.wrap(e).type(number);
	});
});

Cypress.Commands.add('typeSoleInput', (element) => {
	const number = generateRandomNumber();
	cy.wrap(element).type(number);
});
