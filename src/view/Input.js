import readLineAsync from "../utils/readLineAsync.js";

class Input {
  async getPurchasePrice() {
    const price = await readLineAsync("구입금액을 입력해 주세요.");
    return price;
  }

  async getLottoWinningNumbers() {
    const numbers = await readLineAsync("당첨 번호를 입력해 주세요.");
    return numbers;
  }

  async getLottoBonusNumber() {
    const numbers = await readLineAsync("보너스 번호를 입력해 주세요.");
    return numbers;
  }
}

export default Input;
