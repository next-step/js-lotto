import { ERROR_MESSAGES } from "../constants/error";
import { readLineAsync } from "../utils/readLineAsync";
import { validateNumber } from "../utils/validator/validateNumber";

export class View {
  static async inputAmount() {
    try {
      const input = await readLineAsync("> 구입금액을 입력해 주세요.");
      validateNumber(input);
      return Number(input);
    } catch (error) {
      View.printError(error);
    }
  }

  static async inputWinningNumbers() {
    try {
      const input = await readLineAsync("> 당첨 번호를 입력해 주세요.");

      return input;
    } catch (error) {
      View.printError(error);
    }
  }

  static async inputBonusNumber() {
    try {
      const input = await readLineAsync("> 보너스 번호를 입력해 주세요.");

      return input;
    } catch (error) {
      View.printError(error);
    }
  }

  static async inputReStart() {
    try {
      const input = await readLineAsync("> 다시 시작하시겠습니까? (y/n)");

      return input;
    } catch (error) {
      View.printError(error);
    }
  }

  static outputBuyLog(count, lottoList) {
    const logs = [];
    logs.push(`${count}개를 구매했습니다.`);
    lottoList.forEach((lotto) => {
      logs.push(`[${lotto.numbers.join(", ")}]`);
    });
    console.log(logs.join("\n"));
  }

  static outputWinningLog(winningResult, profitRate) {
    const logs = [];
    logs.push("당첨 통계");
    logs.push("--------------------");
    logs.push(`3개 일치 (5,000원) - ${winningResult[5]}개`);
    logs.push(`4개 일치 (50,000원) - ${winningResult[4]}개`);
    logs.push(`5개 일치 (1,500,000원) - ${winningResult[3]}개`);
    logs.push(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult[2]}개`
    );
    logs.push(`6개 일치 (2,000,000,000원) - ${winningResult[1]}개`);
    logs.push(`총 수익률은 ${profitRate}%입니다.`);
    console.log(logs.join("\n"));
  }

  static printError(error) {
    console.log(ERROR_MESSAGES[error.message] || ERROR_MESSAGES.ERROR_UNKOWN);
  }
}
