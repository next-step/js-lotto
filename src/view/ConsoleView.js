import readLineAsync from "../utils/readLineAsync.js";

class ConsoleView {
  async readPurchaseAmount() {
    const amount = await readLineAsync("> 구입금액을 입력해 주세요: ");
    return amount;
  }

  async readWinningNumbers() {
    return await readLineAsync("> 당첨 번호를 입력해 주세요: ");
  }

  async readBonusNumber() {
    return await readLineAsync("> 보너스 번호를 입력해 주세요.");
  }

  printPurchaseAmountResult(count) {
    console.log(`${count}개를 구매했습니다.`);
  }

  printGeneratedLottoNumbers(lottos) {
    lottos.forEach((lotto) => console.log(lotto.lottoNumbers));
  }
  printDivider() {
    console.log("\n");
  }
  printWinners() {
    console.log("당첨 통계");
    console.log("--------------------");
  }
  #printWinner({ matchCount, totalPrize, winningCount }) {
    console.log(`${matchCount}개 일치 (${totalPrize}원) - ${winningCount}개`);
  }
  printProfitRate(profitRate) {
    console.log(`총 수익률은 ${profitRate}입니다.`);
  }
}

export default ConsoleView;
