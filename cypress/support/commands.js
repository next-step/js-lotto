Cypress.Commands.add("purchaseLotto", (number) => {
  cy.get("[data-cy=purchase-form]")
    .find("[data-cy=purchase-price-input]")
    .type(number)
    .type("{Enter}");
});

Cypress.Commands.add("clickNumbersToggleBtn", (selector) => {
  cy.get(selector).click();
});
