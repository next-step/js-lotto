import { checkTicketRank } from "../../../src/js/countWinningTicket.js";
import { inputLottoNumbers } from "./inputLottoNumber.js";

export const checkByTicketsNumbers = (lottoNums) => {
  for (let i = 0; i < lottoNums.length; i++) {
    let bonus = inputLottoNumbers(lottoNums[i]);
    cy.get(".bonus-number").type(bonus);
    let matched = checkMatchCount(lottoNums, lottoNums[i], bonus);

    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
    compareModal(matched, lottoNums.length * 1000);
    cy.get(".modal-close").click();
    cy.get(".modal").should("not.have.class", "open");
    clearLottoNumbers();
  }
};

export const checkByLastWeekNumbers = (lottoNums, ary) => {
  let bonus = ary.splice(6)[0];
  inputLottoNumbers(ary);
  cy.get(".bonus-number").type(bonus);
  let matched = checkMatchCount(lottoNums, ary, bonus);

  cy.get(".open-result-modal-button").click();
  cy.get(".modal").should("have.class", "open");
  compareModal(matched, lottoNums.length * 1000);
  cy.get(".modal-close").click();
  cy.get(".modal").should("not.have.class", "open");
};

const checkMatchCount = (lottoNums, curNums, bonus_num) => {
  let matchRanks = [0, 0, 0, 0, 0];
  lottoNums.forEach((x) => {
    let match = 0;
    let bonus = false;
    x.forEach((v) => {
      v = parseInt(v);
      if (curNums.includes(v)) match++;
      if (v == bonus_num) bonus = true;
    });
    checkTicketRank(matchRanks, match, bonus);
  });
  return matchRanks;
};

const compareModal = (matched, investment) => {
  const lottoRewards = [5000, 50000, 1500000, 30000000, 2000000000];
  let profit = 0;
  cy.get(".match-count").then((x) => {
    [...x].forEach((v, i) => {
      expect(v.innerHTML).to.equal(`${matched[i]}개`);
      profit += matched[i] * lottoRewards[i];
    });
    profit = Math.floor(((profit - investment) / investment) * 100);
    cy.get(".display-profit").then((x) => {
      let html = x[0].innerHTML;
      let str = `당신의 총 수익률은 ${profit}% 입니다.`;
      expect(html).to.equal(str);
    });
  });
};
