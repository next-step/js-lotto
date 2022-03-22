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
Cypress.Commands.add('purchaseLotto', (purchaseAmount) => {
	if (purchaseAmount) {
		cy.get('input[name="purchaseAmountInput"]').type(purchaseAmount);
	}

	cy.get('input[name="purchaseAmountInput"]')
		.next('button')
		.contains('확인')
		.click();
});

Cypress.Commands.add('toggleShowLottoNumbers', () => {
	cy.get('input[name="showLottoNumbersToggle"]').check({force: true});
});

Cypress.Commands.add('submitWinningNumbers', (numbers) => {
	cy.get('form[name=inputWinningNumbersForm]')
		.within(() => {
			cy.get('input').each(($input, index) => {
				$input[0].value = numbers[index];
			});
		})
		.contains('결과 확인하기')
		.click();
});
