import { ERROR_MESSAGES } from "../constants/error";
import { readLineAsync } from "../utils/readLineAsync";

export class View {
  static async inputAmount() {
    try {
      const input = await readLineAsync("> 구입금액을 입력해 주세요.");

      return input;
    } catch (error) {
      console.log(error);
      View.printError(error);
    }
  }

  static printError(error) {
    console.log(ERROR_MESSAGES[error.message] || ERROR_MESSAGES.ERROR_UNKOWN);
  }
}
