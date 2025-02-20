import { commaizeNumber } from '../../utils/index.js';

export const renderJackpotStatisticsAnnouncement = () => {
  console.log('당첨 통계');
  console.log('--------------------');
};

export const renderLottoStatisticInfo = (statisticsResult) => {
  return statisticsResult
    .reverse()
    .forEach(({ matchCount, hasBonus, price, count }) => {
      const bonusText = hasBonus ? ', 보너스 볼 일치' : '';
      console.log(
        `${matchCount}개 일치${bonusText} (${commaizeNumber(price)}원) - ${count}개`,
      );
    });
};

export const renderProfitRate = (percent) => {
  console.log(`총 수익률은 ${percent}%입니다.`);
};
