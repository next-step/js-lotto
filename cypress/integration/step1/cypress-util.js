export const typePriceInput = (price) => {
  cy.get(".price-input").type(price);
  cy.get(".confirm").click();
};
