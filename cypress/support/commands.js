Cypress.Commands.add("winningNumbers", (numbers) => {
  numbers.forEach((number, index) => {
    cy.get(`input[data-cy="winning-number-${index + 1}"]`).type(number);
  });
});

Cypress.Commands.add("bonusNumber", (number) => {
  cy.get("[data-cy=bonus-number]").type(number);
});
