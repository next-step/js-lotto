import { equalArray } from '../../utils/index.js';
import { LOTTO } from '../common/constants.js';
import { isValidLottoNumberRange } from '../common/utils.js';
import { JACKPOT, JACKPOT_RANKS } from './constant.js';

const matchJackpotNumbers = (orderedNumbers, jackpotNumbers) => {
  return orderedNumbers.filter((value) => jackpotNumbers.includes(value));
};

export const isValidJackpot = (numbers) => {
  return (
    Array.isArray(numbers) &&
    numbers.length === LOTTO.SIZE &&
    numbers.every(isValidLottoNumberRange) &&
    [...new Set(numbers)].length === LOTTO.SIZE
  );
};

const getJackpotRank = (matchedNumbers, isBonus) => {
  const match = [matchedNumbers.length, isBonus ? 1 : 0];

  const rank = Object.entries(JACKPOT.RULES).find(([_, rank]) =>
    equalArray(match, rank.match),
  );

  return rank ? JACKPOT.RANKS[rank[0]].number : 0;
};

export const getJackpotPrice = (rank) => {
  return (
    {
      [JACKPOT.RANKS.FIRST.number]: JACKPOT.RULES.FIRST.price,
      [JACKPOT.RANKS.SECOND.number]: JACKPOT.RULES.SECOND.price,
      [JACKPOT.RANKS.THIRD.number]: JACKPOT.RULES.THIRD.price,
      [JACKPOT.RANKS.FOURTH.number]: JACKPOT.RULES.FOURTH.price,
      [JACKPOT.RANKS.FIFTH.number]: JACKPOT.RULES.FIFTH.price,
    }[rank] ?? 0
  );
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
  if (!Array.isArray(lottoResult)) {
    throw new Error('총 당첨 금액을 계산하는데 잘못된 입력값을 주셨습니다.');
  }

  return lottoResult.reduce((total, lotto) => total + (lotto.price ?? 0), 0);
};

export const getJackpotResult = (lotto, bonusNumber) => {
  const { ordered, jackpot } = lotto;

  const hasBonusNumber = ordered.includes(bonusNumber);
  const matchedNumbers = matchJackpotNumbers(ordered, jackpot);
  const matchedCount = matchedNumbers.length;

  const rank = getJackpotRank(matchedNumbers, hasBonusNumber);
  const price = getJackpotPrice(rank);
  const isJackpot = matchJackpotNumbers.length >= JACKPOT.MIN_MATCH;

  return { isJackpot, rank, price, matchedCount };
};

export const calculateLottoResults = (
  orderedLottos,
  jackpotNumbers,
  bonusNumber,
) => {
  return orderedLottos.map((orderedLotto) =>
    getJackpotResult(
      { ordered: orderedLotto, jackpot: jackpotNumbers },
      bonusNumber,
    ),
  );
};
