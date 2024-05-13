import Lotto from "./Lotto.js";

class LottoMachine {
  static LOTTO_LENGTH = 6; // TODO 중복된 것 같은데...
  static LOTTO_PRICE = 1000;

  constructor() {}

  generateLottoNumber() {
    let lottoNumbers = [];
    for (let i = 0; i < LottoMachine.LOTTO_LENGTH; i++) {
      const randomNumber = this.#generateRandomNumbers();
      lottoNumbers.push(randomNumber);
    }

    return new Lotto(lottoNumbers);
  }

  calculateLottoCount(purchase) {
    return purchase / LottoMachine.LOTTO_PRICE;
  }

  #generateRandomNumbers() {
    return Math.floor(Math.random() * 45) + 1;
  }
}

export { LottoMachine };
