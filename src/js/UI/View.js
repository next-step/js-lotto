import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class View {
  #convertToMatchingDataType(input) {
    if (input === "null") {
      return null;
    } else if (input === "undefined") {
      return undefined;
    } else if (/^-?\d+(\.\d+)?$/.test(input)) {
      // 숫자 변환
      return parseFloat(input);
    } else {
      try {
        return JSON.parse(input);
      } catch (error) {
        // 그대로 반환 (문자열 유지)
        return input;
      }
    }
  }

  #convertToArray(input) {
    return input
      .split(",")
      .map((element) => this.#convertToMatchingDataType(element));
  }

  printLine(line) {
    console.log(line);
  }

  async addPurchasingPriceHandler(cbFunc) {
    const purchasingPriceInput = await new Promise((resolve) =>
      readlineInterface.question("> 구입금액을 입력해 주세요. ", resolve)
    );
    this.printLine("1개를 구매했습니다.");

    const purchasingPrice =
      this.#convertToMatchingDataType(purchasingPriceInput);
    cbFunc(purchasingPrice);
  }

  async addWinningInfoHandler(cbFunc) {
    const winningNumbersInput = await new Promise((resolve) =>
      readlineInterface.question("> 당첨 번호를 입력해 주세요. ", resolve)
    );
    const winningNumbers = this.#convertToArray(winningNumbersInput);
    this.printLine("");

    const bonusNumberInput = await new Promise((resolve) =>
      readlineInterface.question("> 보너스 번호를 입력해 주세요. ", resolve)
    );
    const bonusNumber = this.#convertToMatchingDataType(bonusNumberInput);
    this.printLine("");

    cbFunc(winningNumbers, bonusNumber);
  }

  printStatistics(rankCount, revenueRate) {
    // ranks: [1, 2, 3, 4, 5]
    const matchCounts = [6, 5, 5, 4, 3];
    const prizes = [
      "2,000,000,000",
      "30,000,000",
      "1,5000,000",
      "50,000",
      "5,000",
    ];

    let statistics = [];
    const winningRankCount = rankCount.slice(0, rankCount.length - 1);
    winningRankCount.forEach((count, idx) => {
      const extraInfo = idx === 2 ? ", 보너스 볼 일치" : "";
      const summary = `${matchCounts[idx]}개 일치${extraInfo} (${prizes[idx]}원) - ${count}개`;
      statistics.push(summary);
    });
    statistics = statistics.reverse();
    statistics.push(`총 수익률은 ${revenueRate}%입니다.`);

    this.printLine("당첨 통계");
    this.printLine("--------------------");
    statistics.forEach((line) => this.printLine(line));
  }

  close() {
    readlineInterface.close();
  }
}
