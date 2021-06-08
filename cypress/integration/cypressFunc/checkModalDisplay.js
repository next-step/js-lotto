import {
  checkByTicketsNumbers,
  checkByLastWeekNumbers,
} from "./checkByCase.js";

export const checkModalDisplay = (checkCase, lastWeek) => {
  cy.get(".lotto-detail").then((x) => {
    let lottoNums = [];
    for (let i = 0; i < x.length; i++) {
      lottoNums.push(x[i].innerHTML.split(", "));
    }
    if (!checkCase) {
      checkByTicketsNumbers(lottoNums);
    } else {
      checkByLastWeekNumbers(lottoNums, lastWeek);
    }
  });
};
