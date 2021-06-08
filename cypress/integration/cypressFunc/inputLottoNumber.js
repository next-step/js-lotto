import { FUNC, BALL } from "../../../src/js/constant.js";

export const inputLottoNumbers = (ary) => {
  let bonus = 0;

  cy.get(".winning-number").then((x) => {
    ary.forEach((v, i) => {
      cy.wrap(x[i]).type(v);
    });
  });

  do {
    bonus = FUNC.getRandomVal(BALL.MIN, BALL.MAX);
  } while (ary.includes(bonus));
  return bonus;
};

export const clearLottoNumbers = () => {
  cy.get(".winning-number").then((x) => {
    [...x].forEach((v) => {
      cy.wrap(v).clear();
    });
  });
  cy.get(".bonus-number").clear();
};
