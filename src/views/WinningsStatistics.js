import { RANK_INFO } from '../constants/winnings.js';

const WinningsStatistics = async () => {
  console.log('당첨 통계--------------------');

  for (let i = 0; i < RANK_INFO.length; i++) {
    const rankInfo = RANK_INFO[i];

    const rankPrize = `${rankInfo.matchCount}개 일치${
      rankInfo.rank === 2 ? ', 보너스 볼 일치' : ''
    } (${rankInfo.money.toLocaleString()}원)`;

    console.log(`${rankPrize}`);
  }
};

export default WinningsStatistics;
