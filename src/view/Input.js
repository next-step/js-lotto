import readLineAsync from "../utils/readLineAsync.js";

class Input {
  async getPurchasePrice() {
    const price = await readLineAsync("구입금액을 입력해 주세요.");
    return price;
  }
}

export default Input;
