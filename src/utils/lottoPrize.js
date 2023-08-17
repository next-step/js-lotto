import {
  LOTTO_INITIAL_PRIZE_COUNT,
  NUMBER,
  LOTTO_PRIZE_BOARD,
} from '../constants';

export const calculatePrizeCount = (ticketResults) => {
  const prizeCount = LOTTO_INITIAL_PRIZE_COUNT;

  ticketResults.forEach((result) => updatePrizeCount(prizeCount, result));

  return prizeCount;
};

const checkBonusMatch = (prizeCount, result) => {
  const bonusMatchThreshold = NUMBER.LOTTO_PRIZE.BONUS_MATCH_THRESHOLD;

  if (result.prize === LOTTO_PRIZE_BOARD[bonusMatchThreshold].withBonus)
    return prizeCount[bonusMatchThreshold].withBonus++;

  return prizeCount[bonusMatchThreshold].withoutBonus++;
};

const updatePrizeCount = (prizeCount, result) => {
  if (result.matchingCount === NUMBER.LOTTO_PRIZE.BONUS_MATCH_THRESHOLD)
    return checkBonusMatch(prizeCount, result);

  return prizeCount[result.matchingCount]++;
};

export const calculateTotalPrize = (ticketResults) => {
  return ticketResults.reduce(
    (acc, result) => acc + result.prize,
    NUMBER.INITIAL_TOTAL_RPIZE
  );
};

export const calculateProfitRate = (totalPrize, ticketAmount) => {
  return (totalPrize / (ticketAmount * NUMBER.DEFAULT_TICKET_PRICE)) * 100;
};
