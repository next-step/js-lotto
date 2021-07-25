import { LOTTO_PRICES, VALUE } from './Constans.js';

const _PRICE = 'price';

export const matchNums = (lottoNum, winnerNum) => {
  const winnerBonusNum = winnerNum.slice(VALUE.LOTTO_COUNT)[0];

  const matchCount = winnerNum.filter((num) => lottoNum.includes(num)).length;
  const matchBonus = lottoNum.includes(winnerBonusNum);

  return { matchCount, matchBonus };
};

export const getWinnerInfo = (lottos) => {
  const winnerCount = Array(VALUE.WINNER_COUNT).fill(0);
  let totalPrice = 0;
  for (const { matchCount, matchBonus } of lottos) {
    const idx = {
      ['3']: VALUE.COUNT.MATCH_COUNT_THREE_IDX,
      ['4']: VALUE.COUNT.MATCH_COUNT_FOUR_IDX,
      ['5']: VALUE.COUNT.MATCH_COUNT_FIVE_IDX,
      ['6']: VALUE.COUNT.MATCH_COUNT_SIX_IDX,
    }[matchCount];
    let price = 0;

    if (idx === undefined) continue;

    if (idx === VALUE.COUNT.MATCH_COUNT_SIX_IDX && matchBonus) {
      price = LOTTO_PRICES[VALUE.COUNT.BONUS_IDX][_PRICE];
      winnerCount[VALUE.COUNT.BONUS_IDX]++;
    } else {
      price = LOTTO_PRICES[idx][_PRICE];
      winnerCount[idx]++;
    }
    totalPrice += price;
  }

  return { winnerCount, totalPrice };
};

export const getProfitRate = (totalPrice, purchasePrice) => {
  return (totalPrice / purchasePrice) * 100 - 100;
};
