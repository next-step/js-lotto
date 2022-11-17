// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
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

import { formSelector, inputSelector } from '../../src/js/constants/selectors';

Cypress.Commands.add('submitPriceForm', (money) => {
	cy.get(inputSelector.LOTTO_PURCHASE_FORM_INPUT).type(money);
	cy.get(formSelector.LOTTO_PURCHASE_FORM).submit();
});

Cypress.Commands.add('submitAnswerForm', () => {
	cy.get(inputSelector.LOTTO_ANSWER_NUMBER_INPUT).each((input, idx) => {
		cy.wrap(input)
			.type(idx + 1)
			.should('have.value', idx + 1);
	});
	cy.get(inputSelector.LOTTO_BONUS_NUMBER_INPUT).type(7);
	cy.get(formSelector.LOTTO_ANSWER_FORM).submit();
});
