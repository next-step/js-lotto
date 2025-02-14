import { LOTTO_JACKPOT_PRICES } from './constant';

const isValidBounsNumber = (orderedNumbers, bounsNumber) =>
  orderedNumbers.includes(bounsNumber);

const matchJackpotNumbers = (orderedNumbers, jackpotNumbers) => {
  return orderedNumbers.filter((value) => jackpotNumbers.includes(value));
};

const getJackpotRank = (matchedNumbers, isBouns) => {
  const count = matchedNumbers.length;

  return (() => {
    if (count === 6) return 1;
    if (count === 5 && isBouns) return 2;
    if (count === 5 && !isBouns) return 3;
    if (count === 4) return 4;
    if (count === 3) return 5;
    return 0;
  })();
};

export const getJackpotPrice = (rank) => {
  return (() => {
    if (rank === 1) return LOTTO_JACKPOT_PRICES.FIRST;
    if (rank === 2) return LOTTO_JACKPOT_PRICES.SECOND;
    if (rank === 3) return LOTTO_JACKPOT_PRICES.THIRD;
    if (rank === 4) return LOTTO_JACKPOT_PRICES.FOUTRH;
    if (rank === 5) return LOTTO_JACKPOT_PRICES.FIFTH;
    return 0;
  })();
};

export const getJackpotResult = (lotto, bounsNumber) => {
  const { ordered, jackpot } = lotto;

  const hasBounsNumber = isValidBounsNumber(ordered, bounsNumber);
  const matchedNumbers = matchJackpotNumbers(ordered, jackpot);

  const isJackpot = matchJackpotNumbers.length > 3;
  const rank = getJackpotRank(matchedNumbers, hasBounsNumber);
  const price = getJackpotPrice(rank);

  return { isJackpot, rank, price };
};
