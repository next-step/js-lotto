import Lotto from "./Lotto.js";

class LottoMachine {
  static LOTTO_LENGTH = 6;
  static LOTTO_PRICE = 1000;

  constructor() {}

  generateLottoNumber() {
    return new Lotto(
      Array(LottoMachine.LOTTO_LENGTH)
        .fill()
        .map(() => this.#generateRandomNumbers())
    );
  }

  calculateLottoCount(purchase) {
    return purchase / LottoMachine.LOTTO_PRICE;
  }

  #generateRandomNumbers() {
    return Math.floor(Math.random() * 45) + 1;
  }
}

export { LottoMachine };
