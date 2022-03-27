export const typePriceInput = (price) => {
  cy.get(".price-input").type(price);
  cy.get(".confirm").click();
};

export const clickButtonWithSelector = (selectorString) => {
  cy.get(selectorString).click();
};
