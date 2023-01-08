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

import { ELEMENT } from '../../src/constants/elements';

Cypress.Commands.add('buyNewLottoWithValue', (spendMoney) => {
  cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(spendMoney);
  cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();
  cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).should('not.be.checked');
});

Cypress.Commands.add('winLottoInFirstPlace', () => {
  cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).click({ force: true });
  cy.get(ELEMENT.LOTTO_NUMBER)
    .first()
    .invoke('text')
    .then((text) => {
      const firstRowLottoNumbers = text
        .split(' ')
        .map((el) => el.replace(/(\r\n|\n|\r)/gm, ''))
        .filter((el) => el !== '');

      cy.get(ELEMENT.WINNING_NUMBERS_INPUT).each((eachInput, index) => {
        cy.get(eachInput).type(firstRowLottoNumbers[index]);
      });

      cy.get(ELEMENT.BONUS_NUMBER_INPUT).type(firstRowLottoNumbers[0]);
      cy.get(ELEMENT.OPEN_RESULT_MODAL_BUTTON).should('not.be.disabled');
      cy.get(ELEMENT.OPEN_RESULT_MODAL_BUTTON).click();
      cy.wait(1000);
      cy.get('.modal').should('exist');
    });
});

Cypress.Commands.add('moveAutoPurchase', () => {
  cy.get(ELEMENT.DONE_MANUAL_BUTTON).click({ force: true });
});

Cypress.Commands.add('makeResult', (price) => {
  cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(price);
  cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();
});

Cypress.Commands.add('addManualNumbers', (manualNumbers) => {
  cy.get(ELEMENT.MANUAL_NUMBERS_INPUT).each((manualInput, index) => {
    cy.get(manualInput).type(manualNumbers[index]);
  });
  cy.get(ELEMENT.MANUAL_SUBMIT_BUTTON).click({ force: true });
});
