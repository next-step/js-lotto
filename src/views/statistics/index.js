import {
  LOTTO_JACKPOT_PRICES,
  LOTTO_JACKPOT_RANK_RULES,
} from '../../domains/jackpot/constant.js';
import { commaizeNumber } from '../../utils/index.js';

export const renderJackpotStatisticsAnnouncement = () => {
  console.log('당첨 통계');
  console.log('--------------------');
};

export const renderLottoStatisticInfo = (statisticsResult) => {
  return Object.entries(statisticsResult).forEach(([rank, { count }]) => {
    if (rank === 'SECOND') {
      console.log(
        `${LOTTO_JACKPOT_RANK_RULES[rank]}개 일치, 보너스 볼 일치 (${commaizeNumber(LOTTO_JACKPOT_PRICES[rank])}원) - ${count}개`,
      );
      return;
    }

    console.log(
      `${LOTTO_JACKPOT_RANK_RULES[rank]}개 일치 (${commaizeNumber(LOTTO_JACKPOT_PRICES[rank])}원) - ${count}개`,
    );
  });
};

export const renderProfitRate = (percent) => {
  console.log(`총 수익률은 ${percent}%입니다.`);
};
