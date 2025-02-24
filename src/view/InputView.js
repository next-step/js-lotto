import readLineAsync from "../utils/readLineAsync.js";

class InputView {
  async askBudget() {
    return await readLineAsync("구입금액을 입력해 주세요.\n");
  }

  async askWinningNumbers() {
    return readLineAsync("당첨 번호를 입력해 주세요.\n");
  }

  async askBonusNumber() {
    return readLineAsync("보너스 볼을 입력해 주세요.\n");
  }
}

export default InputView;
