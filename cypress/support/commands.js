// import { generateRandomNumber } from '../../src/js/lotto';

Cypress.Commands.add('getByCydata', (selector) => {
	cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('checkInvalidInput', (cySelector, msg) => {
	cy.getByCydata(cySelector).invoke('prop', 'validationMessage').should('equal', msg);
});

Cypress.Commands.add('typeMultiInput', (elements, testCase) => {
	[...elements].slice(0, testCase.length).forEach((e, i) => {
		cy.wrap(e).type(testCase[i]);
	});
});

Cypress.Commands.add('typeSoleInput', (element, testCase) => {
	cy.wrap(element).type(testCase);
});

Cypress.Commands.add('checkAlert', (validatorMessage) => {
	cy.on('window:alert', (alertText) => {
		expect(alertText).to.contains(validatorMessage);
	});
});
