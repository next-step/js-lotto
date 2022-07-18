import {
  CHARGE_BUTTON,
  CHARGE_INPUT,
  NUMBER_VISIBILITY_TOGGLE,
  WINNING_NUMBER_FORM,
  CHECK_AWARD_BUTTON,
  AWARD_MODAL_CLOSE_BUTTON,
} from "../../src/js/utils/selectors";

Cypress.Commands.add("buyLotto", (charge) => {
  cy.get(CHARGE_INPUT).type(charge);
  cy.get(CHARGE_BUTTON).click();
});

Cypress.Commands.add("toggleViewLotto", () => {
  cy.get(`${NUMBER_VISIBILITY_TOGGLE} input[type=checkbox]`).click({ force: true });
});

const WINNING_NUMBERS_MOCK = [1, 2, 3, 4, 5, 6];
const BONUS_NUMBER_MOCK = 45;

Cypress.Commands.add("setWinningNumbers", (winningNumbers = WINNING_NUMBERS_MOCK, bonusNumber = BONUS_NUMBER_MOCK) => {
  if (winningNumbers.length !== 6) throw new Error("Invalid winning numbers");
  cy.get(`${WINNING_NUMBER_FORM} input[name=winningNumbers]`).each(($el, index) => {
    cy.wrap($el).type(winningNumbers[index]);
  });
  cy.get(`${WINNING_NUMBER_FORM} input[name=bonusNumber]`).type(bonusNumber);
});

Cypress.Commands.add("showAward", () => {
  cy.get(CHECK_AWARD_BUTTON).click();
});

Cypress.Commands.add("closeAward", () => {
  cy.get(AWARD_MODAL_CLOSE_BUTTON).click();
});
