const formSelector = `[data-cy="purchase-form"]`;
const inputSelector = `[data-cy="purchase-amount"]`;
const buttonSelector = `[data-cy="purchase-button"]`;

Cypress.Commands.add("purchaseLotto"),
  (money) => {
    cy.get(inputSelector).type(money);
    cy.get(formSelector).submit();
  };
