import readLineAsync from "../utils/readLineAsync.js";

class Input {
  async getPurchasePrice() {
    const price = await readLineAsync("> 구입금액을 입력해 주세요.");
    return price;
  }

  async getLottoWinningNumbers() {
    const numbers = await readLineAsync("> 당첨 번호를 입력해 주세요.");
    return numbers;
  }

  async getLottoBonusNumber() {
    const numbers = await readLineAsync("> 보너스 번호를 입력해 주세요.");
    return numbers;
  }

  async getRestart() {
    const answer = await readLineAsync("> 다시 시작하시겠습니까? (y/n)");
    return answer;
  }
}

export default Input;
