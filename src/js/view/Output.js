import LottoResult from "../domain/LottoResult";

const Output = {
  printLottoRankingStatistics(lottoRankingStatistics) {
    console.log("\n당첨 통계\n--------------------");
    for (let i = LottoResult.LottoRanking.length - 1; i > 0; i--) {
      const template = this.generateLottoRankingCountsTemplate(
        i,
        lottoRankingStatistics
      );

      console.log(template);
    }
  },

  generateLottoRankingCountsTemplate(ranking, lottoRankingCounts) {
    return `${LottoResult.LottoMatchingCountCondition[ranking]}개 일치${
      ranking === LottoResult.LottoRanking[2] ? ", 보너스 볼 일치" : ""
    } (${LottoResult.LottoWinningPrice[ranking].toLocaleString("ko-KR")}원) - ${
      lottoRankingCounts[ranking]
    }개`;
  },

  printLottoProfitRate(lottoProfitRate) {
    console.log(`총 수익률은 ${lottoProfitRate}%입니다.`);
  },

  printGeneratedLottosCount(lottosCount) {
    console.log(`${lottosCount}개를 구매했습니다.`);
  },

  printGeneratedLottosNumbers(lottos) {
    lottos.forEach((lotto) => {
      const joinedLottoNumbers = lotto.numbers.join(", ");
      console.log(`[${joinedLottoNumbers}]`);
    });
  },
};

export default Output;
