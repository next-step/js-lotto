const Output = {
  printLottoRankingStatistics(lottoResultCounts) {
    console.log("\n당첨 통계\n--------------------");
    lottoResultCounts.forEach((lottoResultCount) => {
      this.printLottoRankingCount(lottoResultCount);
    });
  },

  printLottoRankingCount({
    rankingWinningPrice,
    rankingCondition,
    extraMentShown,
    count,
  }) {
    const template = `${rankingCondition}개 일치${
      extraMentShown ? ", 보너스 볼 일치" : ""
    } (${rankingWinningPrice.toLocaleString("ko-KR")}원) - ${count}개`;

    console.log(template);
  },

  printLottoProfitRate(lottoProfitRate) {
    console.log(`총 수익률은 ${lottoProfitRate}%입니다.`);
  },

  printGeneratedLottosCount(lottosCount) {
    console.log(`${lottosCount}개를 구매했습니다.`);
  },

  printGeneratedLottosNumbers(lottosNumbers) {
    lottosNumbers.forEach((lottoNumbers) => {
      const joinedLottoNumbers = lottoNumbers.join(", ");
      console.log(`[${joinedLottoNumbers}]`);
    });
  },
};

export default Output;
