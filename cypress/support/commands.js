Cypress.Commands.add("checkAlertMessage", (message) => {
  cy.on("window:alert", (text) => expect(text).to.equal(message));
});

Cypress.Commands.add("purchaseLotto", (number) => {
  cy.get("[data-cy=purchase-form]")
    .find("[data-cy=purchase-price-input]")
    .type(number)
    .type("{Enter}");
});

Cypress.Commands.add("clickNumbersToggleBtn", (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add("inputWinningNumber", (numbers) => {
  numbers.forEach((number, index) => {
    cy.get(`input[data-cy="winning-number-${index + 1}"]`).type(number);
  });
});

Cypress.Commands.add("inputBonusNumber", (number) => {
  cy.get("[data-cy=bonus-number]").type(number);
});
