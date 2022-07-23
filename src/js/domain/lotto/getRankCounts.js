import { LOTTO_MAX_NUMBER, RANK } from './constants.js';
import getLottoRank from './getLottoRank.js';

export default function getRankCounts({ lottos, wonLotto, bonusNumber }) {
  const rankCounts = {
    [RANK.FIFTH]: 0,
    [RANK.FOURTH]: 0,
    [RANK.THRID]: 0,
    [RANK.SECOND]: 0,
    [RANK.FIRST]: 0,
  };

  const drawNumbers = new Array(LOTTO_MAX_NUMBER + 1)
    .fill(null)
    .map((value, index) => wonLotto.includes(index));

  lottos.forEach(lotto => {
    const matchedCount = lotto.reduce((acc, number) => (drawNumbers[number] ? acc + 1 : acc), 0);
    const hasBonusNumber = lotto.includes(bonusNumber);
    const rank = getLottoRank({ count: matchedCount, hasBonusNumber });

    rankCounts[rank] += 1;
  });

  return rankCounts;
}
