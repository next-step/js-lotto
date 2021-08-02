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
import '@testing-library/cypress/add-commands';
import CONSTANTS from '../../src/js/constants';

// form validation reference
// https://glebbahmutov.com/blog/form-validation-in-cypress/
// chaining reference
// https://www.toolsqa.com/cypress/custom-commands-in-cypress/
Cypress.Commands.add(
	'shouldEmptyMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.EMPTY_INPUT);
	}
);
// 이부분은 유닛테스트에게 위임하는것이 더 좋을 것 같다.
// 해당 e2e테스트에서는 detail이 visiable하냐 안하냐만 판단해도 될듯 싶다.
Cypress.Commands.add(
	'shouldHaveSixNumbersAndEachGteOneAndLteFourtyFive',
	{ prevSubject: 'element' },
	($lottoDetail) => {
		return cy
			.wrap($lottoDetail)
			.invoke('text')
			.should(
				'match',
				/^([1-9]|[1-3][0-9]|4[0-5]), ([1-9]|[1-3][0-9]|4[0-5]), ([1-9]|[1-3][0-9]|4[0-5]), ([1-9]|[1-3][0-9]|4[0-5]), ([1-9]|[1-3][0-9]|4[0-5]), ([1-9]|[1-3][0-9]|4[0-5])$/
			);
	}
);
Cypress.Commands.add(
	'shouldPurchaseRequiredMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.PURCHASE.INVALID_AMOUNT_INPUT);
	}
);
Cypress.Commands.add(
	'shouldPurchaseMinMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.PURCHASE.MIN_AMOUNT);
	}
);
Cypress.Commands.add(
	'shouldPurchaseMaxMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.PURCHASE.MAX_AMOUNT);
	}
);
Cypress.Commands.add(
	'shouldLottosDuplicatedMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.LOTTOS.DUPLICATED);
	}
);

Cypress.Commands.add(
	'shouldLottosMinMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.LOTTOS.MIN_NUMBER);
	}
);
Cypress.Commands.add(
	'shouldLottosMaxMessage',
	{ prevSubject: 'element' },
	($inputEl) => {
		return cy
			.wrap($inputEl)
			.invoke('prop', 'validationMessage')
			.should('equal', CONSTANTS.MESSAGES.LOTTOS.MAX_NUMBER);
	}
);
