/// <reference types="Cypress" />

declare namespace Cypress {
	interface Chainable {
		shouldEmptyMessage($formEl: Element): Cypress.Chainable<any>;
		shouldPurchaseRequiredMessage($formEl: Element): Cypress.Chainable<any>;
		shouldPurchaseMinMessage($formEl: Element): Cypress.Chainable<any>;
		shouldPurchaseMaxMessage($formEl: Element): Cypress.Chainable<any>;
		shouldLottosDuplicatedMessage($formEl: Element): Cypress.Chainable<any>;
		shouldLottosMinMessage($formEl: Element): Cypress.Chainable<any>;
		shouldLottosMaxMessage($formEl: Element): Cypress.Chainable<any>;
		shouldHaveSixNumbersAndEachGteOneAndLteFourtyFive(
			$formEl: Element
		): Cypress.Chainable<any>;
	}
}
