import * as readline from "node:readline/promises";

export class ConsoleViewer {
  static #PAYMENT_INPUT_GUIDE = "> 구입금액을 입력해 주세요.";
  static #AMOUNT_MESSAGE = (amount) => `${amount}개를 구매했습니다.\n`;
  static #WINNING_NUMBERS_INPUT_GUIDE = "> 당첨 번호를 입력해 주세요.";
  static #BONUS_NUMBER_INPUT_GUIDE = "\n> 보너스 번호를 입력해 주세요.";
  static #PRIZE_SUMMARY_HEADER = "\n당첨 통계\n--------------------\n";
  static #PRIZE_DETAIL_MESSAGE = (
    matchingNumberCount,
    prizeAmount,
    count,
    requiresBonusNumber,
  ) =>
    `${matchingNumberCount}개 일치${
      requiresBonusNumber && ", 보너스 볼 일치"
    } (${prizeAmount.toLocaleString()}원) - ${count}개\n`;
  static #PROFIT_RATIO_MESSAGE = (ratio) =>
    `총 수익률은 ${(ratio * 100).toFixed(1)}%입니다.\n`;
  static #WINNING_NUMBERS_SEPARATOR = ",";
  static #TICKET_FORMAT = (ticket) => `[${ticket.join(", ")}]\n`;

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getUserInput(question) {
    return this.readline.question(question);
  }

  printContent(content) {
    console.log(content);
  }

  getPaymentInput() {
    return this.getUserInput(ConsoleViewer.#PAYMENT_INPUT_GUIDE);
  }

  getWinningNumbers() {
    return this.getUserInput(ConsoleViewer.#WINNING_NUMBERS_INPUT_GUIDE);
  }

  getBonusNumber() {
    return this.getUserInput(ConsoleViewer.#BONUS_NUMBER_INPUT_GUIDE);
  }

  printAmount(amount) {
    this.printContent(ConsoleViewer.#AMOUNT_MESSAGE(amount));
  }

  printLottoNumbers(tickets) {
    tickets.forEach((ticket) => {
      this.printContent(ConsoleViewer.#TICKET_FORMAT(ticket));
    });

    this.printContent("");
  }

  printPrizeSummary(totalPrize) {
    this.printContent(ConsoleViewer.#PRIZE_SUMMARY_HEADER);

    totalPrize.forEach((prize) => {
      this.printContent(
        ConsoleViewer.#PRIZE_DETAIL_MESSAGE(
          prize.matchingNumberCount,
          prize.prizeAmount,
          prize.count,
          prize.requiresBonusNumber,
        ),
      );
    });
  }

  printProfitRatio(ratio) {
    this.printContent(ConsoleViewer.#PROFIT_RATIO_MESSAGE(ratio));
  }

  closeViewer() {
    this.readline.close();
  }
}
