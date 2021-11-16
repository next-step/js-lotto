Cypress.Commands.add("purchaseLotto", (number) => {
  cy.get(".purchase__form").find("input").type(number).type("{Enter}");
});

Cypress.Commands.add("clickNumbersToggleBtn", (selector) => {
  cy.get(selector).click();
});
