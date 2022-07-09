Cypress.Commands.add("buy", (payment) => {
  cy.get('input[placeholder="구입 금액"]').type(payment);
  cy.get("button").contains("확인").click();
});

Cypress.Commands.add("clickLottoSwitch", () => {
  cy.get(".switch").click();
});

Cypress.Commands.add("getTotalPurchased", () => {
  return cy.get("#total-purchased");
});

Cypress.Commands.add("getDetailOfTicket", () => {
  return cy.get(".lotto-detail");
});
