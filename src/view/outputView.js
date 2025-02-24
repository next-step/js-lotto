import { getPrizeLabel } from "./prizeLabel.js";

class OutputView {
  static printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  }

  static printLottos(lottos) {
    for (const lotto of lottos) {
      const lottoNumbers = lotto
        .getLottoNumbers()
        .map((lottoNumber) => lottoNumber.getValue());
      console.log(lottoNumbers.join(","));
    }
  }

  printError(errorMessage) {
    console.log(errorMessage);
  }

  printWinningStatistics(winningStatistics, lottoGame) {
    console.log("당첨 통계");
    console.log("--------------------");
    for (const [prize, count] of winningStatistics.entries()) {
      const label = getPrizeLabel(prize);
      console.log(`${label} - ${count}개`);
    }
    console.log(`총 수익률은 ${lottoGame.getProfit()}%입니다.`);
  }
}

export default OutputView;
