import LottoError from "../common/LottoError.js";

class Lotto {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 45;
  static LOTTO_LENGTH = 6;

  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validateNumbers(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;
  }

  #validateNumbers(lottoNumbers) {
    if (
      lottoNumbers.some(
        (number) => number > Lotto.MAX_NUMBER || number < Lotto.MIN_NUMBER
      )
    ) {
      throw new Error(LottoError.LOTTO_NUMBER_OUT_OF_RANGE);
    }

    if (lottoNumbers.length != Lotto.LOTTO_LENGTH) {
      throw new Error(LottoError.LOTTO_LENGTH_ERROR);
    }

    if (new Set(lottoNumbers).size !== lottoNumbers.length) {
      throw new Error(LottoError.LOTTO_DUPLICATION_NUMBER);
    }
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
