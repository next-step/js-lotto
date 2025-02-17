import readline from "readline";
import Budget from "../domain/Budget.js";
import LottoNumber from "../domain/LottoNumber.js";

class InputView {
  async askPurchaseAmount() {
    return this.readLineAsync("구입금액을 입력해 주세요.\n").then((input) => {
      return new Budget(Number(input));
    });
  }

  async askWinningNumbers() {
    return this.readLineAsync("당첨 번호를 입력해 주세요.\n").then((input) => {
      return input.split(",").map((number) => new LottoNumber(Number(number)));
    });
  }

  async askBonusNumber() {
    return this.readLineAsync("보너스 볼을 입력해 주세요.\n").then((input) => {
      return new LottoNumber(Number(input));
    });
  }

  async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readLine.question(query, (input) => {
        readLine.close();
        resolve(input);
      });
    });
  }
}

export default InputView;
