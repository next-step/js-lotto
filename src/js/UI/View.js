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
      return parseFloat(input); // 숫자 변환
    } else {
      try {
        return JSON.parse(input);
      } catch (error) {
        return input; // 그대로 반환 (문자열 유지)
      }
    }
  }

  #convertToArray(input) {
    return input
      .split(",")
      .map((element) => this.#convertToMatchingDataType(element));
  }

  async addPurchasingPriceHandler(cbFunc) {
    const purchasingPriceInput = await new Promise((resolve) =>
      readlineInterface.question("> 구입금액을 입력해 주세요. ", resolve)
    );
    const purchasingPrice =
      this.#convertToMatchingDataType(purchasingPriceInput);
    cbFunc(purchasingPrice);
  }

  async addWinningInfoHandler(cbFunc) {
    const winningNumbersInput = await new Promise((resolve) =>
      readlineInterface.question("> 당첨 번호를 입력해 주세요. ", resolve)
    );
    const winningNumbers = this.#convertToArray(winningNumbersInput);
    const bonusNumberInput = await new Promise((resolve) =>
      readlineInterface.question("> 보너스 번호를 입력해 주세요. ", resolve)
    );
    const bonusNumber = this.#convertToMatchingDataType(bonusNumberInput);
    cbFunc(winningNumbers, bonusNumber);
  }

  printLine(line) {
    console.log(line);
  }

  close() {
    readlineInterface.close();
  }
}
