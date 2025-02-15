import { LOTTO_JACKPOT_PRICES, LOTTO_JACKPOT_RANK_RULES } from './constant.js';

const isIncludeBonusNumber = (orderedNumbers, bonusNumber) =>
  orderedNumbers.includes(bonusNumber);

const matchJackpotNumbers = (orderedNumbers, jackpotNumbers) => {
  return orderedNumbers.filter((value) => jackpotNumbers.includes(value));
};

const getJackpotRank = (matchedNumbers, isBonus) => {
  const count = matchedNumbers.length;

  return (() => {
    if (count === LOTTO_JACKPOT_RANK_RULES.FIRST) return 1;
    if (count === LOTTO_JACKPOT_RANK_RULES.SECOND && isBonus) return 2;
    if (count === LOTTO_JACKPOT_RANK_RULES.THIRD && !isBonus) return 3;
    if (count === LOTTO_JACKPOT_RANK_RULES.FOURTH) return 4;
    if (count === LOTTO_JACKPOT_RANK_RULES.FIFTH) return 5;
    return 0;
  })();
};

export const getJackpotPrice = (rank) => {
  return (() => {
    if (rank === 1) return LOTTO_JACKPOT_PRICES.FIRST;
    if (rank === 2) return LOTTO_JACKPOT_PRICES.SECOND;
    if (rank === 3) return LOTTO_JACKPOT_PRICES.THIRD;
    if (rank === 4) return LOTTO_JACKPOT_PRICES.FOURTH;
    if (rank === 5) return LOTTO_JACKPOT_PRICES.FIFTH;
    return 0;
  })();
};

export const getJackpotTargetRankInfo = (targetRank, lottoResult) => {
  return lottoResult.reduce(
    (results, { rank, price }) =>
      rank === targetRank
        ? { count: results.count + 1, amount: results.amount + price }
        : results,
    { count: 0, amount: 0 },
  );
};

export const getJackpotTotalAmount = (lottoResult) => {
  return lottoResult.reduce((total, { price }) => (total += price), 0);
};

export const getJackpotResult = (lotto, bonusNumber) => {
  const { ordered, jackpot } = lotto;

  const hasBonusNumber = isIncludeBonusNumber(ordered, bonusNumber);
  const matchedNumbers = matchJackpotNumbers(ordered, jackpot);

  const matchedCount = matchedNumbers.length;
  const rank = getJackpotRank(matchedNumbers, hasBonusNumber);
  const price = getJackpotPrice(rank);
  const isJackpot =
    matchJackpotNumbers.length >= LOTTO_JACKPOT_RANK_RULES.FIFTH;

  return { isJackpot, rank, price, matchedCount };
};
