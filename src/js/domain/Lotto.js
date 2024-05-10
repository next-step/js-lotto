import LottoError from "../common/LottoError.js";

class Lotto {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 45;
  static LOTTO_LENGTH = 6;

  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);

    this.#numbers = numbers;
  }

  #validateNumbers(numbers) {
    if (
      numbers.some(
        (number) => number > Lotto.MAX_NUMBER || number < Lotto.MIN_NUMBER
      )
    ) {
      throw new Error(LottoError.LOTTO_NUMBER_OUT_OF_RANGE);
    }

    if (numbers.length != Lotto.LOTTO_LENGTH) {
      throw new Error(LottoError.LOTTO_LENGTH_ERROR);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(LottoError.LOTTO_DUPLICATION_NUMBER);
    }
  }

  display() {
    return this.#numbers;
  }
}

export default Lotto;
