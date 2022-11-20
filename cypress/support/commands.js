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

Cypress.Commands.add('winLottoInFirstPlace', () => {
  cy.get($numberToggleButton).click({ force: true });
  cy.get($lottoNumber)
    .first()
    .invoke('text')
    .then((text) => {
      const firstRowLottoNumbers = text
        .split(' ')
        .map((el) => el.replace(/(\r\n|\n|\r)/gm, ''))
        .filter((el) => el !== '');

      cy.get($winningNumberInput).each((eachInput, index) => {
        cy.get(eachInput).type(firstRowLottoNumbers[index]);
      });

      cy.get($bonusNumberInput).type(firstRowLottoNumbers[0]);
      cy.get($submitButton).should('not.be.disabled');
      cy.get($submitButton).click();
      cy.wait(1000);
      cy.get('.modal').should('exist');
    });
});
