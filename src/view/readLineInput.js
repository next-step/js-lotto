import readline from "readline";

class ReadLineInput {
  async askPurchaseAmount() {
    const price = await this.readLineAsync("구입금액을 입력해 주세요. ");
    return Number(price);
  }

  sayPurchase(number) {
    console.log(`${number}개를 구매했습니다.`);
    return `${number}개를 구매했습니다.`;
  }

  async askWinningNumbers() {
    const winningNumbers = await this.readLineAsync(
      "당첨 번호를 입력해 주세요."
    );
    console.log(winningNumbers);
    return winningNumbers;
  }

  async askBonusNumbers() {
    const bonusNumbers = await this.readLineAsync(
      "보너스 번호를 입력해 주세요."
    );
    console.log(Number(bonusNumbers));
    return Number(bonusNumbers);
  }

  // eslint-disable-next-line class-methods-use-this
  async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
}

export default ReadLineInput;
