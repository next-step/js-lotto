import { getRandomInteger } from "../../src/js/util.js";
import { RANDOM_INTEGER_CONDITION } from "../../src/js/constants.js";

export const typePriceInput = (price) => {
  cy.get(".price-input").type(price);
  cy.get(".confirm").click();
};

export const clickButtonWithSelector = (selectorString) => {
  cy.get(selectorString).click();
};

export const typeWinningNumbers = () => {
  cy.get("#winning-number-input-original > div > input").each((input) => {
    const randomInt = getRandomInteger(
      RANDOM_INTEGER_CONDITION.START,
      RANDOM_INTEGER_CONDITION.END
    ).toString();
    console.log(input);
    cy.wrap(input).type(randomInt);
  });
  const randomIntForBonus = getRandomInteger(
    RANDOM_INTEGER_CONDITION.START,
    RANDOM_INTEGER_CONDITION.END
  ).toString();
  cy.get("#winning-number-input-bonus > div > input").type(randomIntForBonus);
  clickButtonWithSelector(".open-result-modal-button");
};
