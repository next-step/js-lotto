import { ERROR_CODES } from "./constants/error";
import { Lotto } from "./domain/Lotto";
import { View } from "./views/view";

export class App {
  async play() {
    const amount = await View.inputAmount();

    const count = this.getLottoCount(amount);

    View.outputBuyLog(count, this.buyLotto(amount));
  }

  getLottoCount(amount) {
    return Math.floor(amount / Lotto.PRICE);
  }

  buyLotto(amount) {
    this.validateAmount(amount);

    const lottoList = [];
    for (let i = 0; i < this.getLottoCount(amount); i++) {
      lottoList.push(new Lotto(this.getRandomNumbers(Lotto.LEN)));
    }

    return lottoList;
  }

  validateAmount(amount) {
    if (amount < Lotto.PRICE) {
      throw new Error(ERROR_CODES.ERROR_AMOUNT_TOO_SMALL);
    }
  }

  getRandomNumbers(length) {
    const numbers = new Set();

    while (true) {
      if (numbers.size === length) {
        return [...numbers].sort((num1, num2) => num1 < num2);
      }

      numbers.add(this.getRandomNumber());
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 45) + 1;
  }
}
