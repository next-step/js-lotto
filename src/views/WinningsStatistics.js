import { RANK_INFO } from '../constants/winnings.js';
import { createRankCountsMap } from '../domain/winningsStatistics.js';

const WinningsStatistics = (purchasedNumbers, lottoNumbers) => {
  const rankCountsMap = createRankCountsMap(purchasedNumbers, lottoNumbers);

  console.log('당첨 통계--------------------');

  RANK_INFO.forEach((info) => {
    const rankPrize = `${info.matchCount}개 일치${
      info.name === 'second' ? ', 보너스 볼 일치' : ''
    } (${info.money.toLocaleString()}원)`;

    const rankCount = rankCountsMap[info.name];

    console.log(`${rankPrize} - ${rankCount}개`);
  });

  return rankCountsMap;
};

export default WinningsStatistics;
