import { $, $$ } from "./dom.js";
import { lottoTickets } from "./addTicketSection.js";

const lottoRewards = [5000, 50000, 1500000, 30000000, 2000000000];

export const countWinningTicket = (win_nums, bonus_num) => {
  let matchRanks = [0, 0, 0, 0, 0];
  lottoTickets.forEach((x) => {
    let match = 0;
    let bonus = false;
    x.numbers.forEach((v) => {
      if (win_nums.includes(v)) match++;
      if (v == bonus_num) bonus = true;
    });
    checkTicketRank(matchRanks, match, bonus);
  });
  changeModalNumber(matchRanks);
};

export const checkTicketRank = (matchRanks, match, bonus) => {
  switch (match) {
    case 3:
      matchRanks[0]++;
      break;
    case 4:
      matchRanks[1]++;
      break;
    case 5:
      if (!bonus) matchRanks[2]++;
      else matchRanks[3]++;
      break;
    case 6:
      matchRanks[4]++;
  }
};

const changeModalNumber = (matchRanks) => {
  const $displayNumber = $$(".match-count");
  const $displayProfit = $(".display-profit");
  let totalReward = 0;
  let investment = lottoTickets.length * 1000;

  $displayNumber.forEach((x, i) => {
    x.innerHTML = matchRanks[i] + "개";
  });
  matchRanks.forEach((x, i) => {
    totalReward += x * lottoRewards[i];
  });
  totalReward = Math.floor(((totalReward - investment) / investment) * 100);
  $displayProfit.innerHTML = `당신의 총 수익률은 ${totalReward}% 입니다.`;
};
