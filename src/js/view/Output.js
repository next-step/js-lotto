import {
  LottoMatchingCountCondition,
  LottoWinningPrice,
  MAX_LOTTO_RANKING,
} from "../../constants/lottoResult";

const Output = {
  printLottoRankingCounts(lottoRankingCounts) {
    console.log("당첨 통계\n--------------------");
    for (let i = MAX_LOTTO_RANKING; i > 0; i--) {
      const template = this.generateLottoRankingCountsTemplate(
        i,
        lottoRankingCounts
      );

      console.log(template);
    }
  },

  generateLottoRankingCountsTemplate(ranking, lottoRankingCounts) {
    return `${LottoMatchingCountCondition[ranking]}개 일치${
      ranking === 2 ? ", 보너스 볼 일치" : ""
    } (${LottoWinningPrice[ranking].toLocaleString("ko-KR")}원) - ${
      lottoRankingCounts[ranking]
    }개`;
  },

  printLottoProfitRate(lottoProfitRate) {
    console.log(`총 수익률은 ${lottoProfitRate}%입니다.`);
  },

  printGeneratedLottosCount(lottosCount) {
    console.log(`${lottosCount}개를 구매했습니다.`);
  },
};

export default Output;
