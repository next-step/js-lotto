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

Cypress.Commands.add("windowAlertStub", (stub, message) => expect(stub.getCall(0)).to.be.calledWith(message));
Cypress.Commands.add("mockMathRandom", (values) => {
  const mockMathRandom = (_values) => {
    const mockValues = _values.map((value) => value / 46);
    let i = -1;
    return () => {
      i += 1;
      return mockValues[i % mockValues.length];
    };
  };
  cy.window().then((window) => {
    window.Math.random = mockMathRandom(values);
  });
});
Cypress.Commands.add("lottoNumsShouldGreaterThan0AndLowerThan46", ($el) => {
  $el
    .text()
    .split(",")
    .forEach((num) => {
      cy.wrap(Number(num)).should("be.gt", 0).should("be.lt", 46);
    });
});
