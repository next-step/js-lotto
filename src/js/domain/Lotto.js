import LottoError from "../common/LottoError.js";

const errorMessage = {
  LOTTO_NUMBER_OUT_OF_RANGE: "로또 번호는 1~45 사이의 정수여야 합니다.",
  LOTTO_LENGTH_ERROR: "로또 번호는 6개여야 합니다.",
  LOTTO_DUPLICATION_NUMBER: "로또 번호는 중복되면 안 됩니다.",
};

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
      throw new LottoError(errorMessage.LOTTO_NUMBER_OUT_OF_RANGE);
    }

    if (lottoNumbers.length != Lotto.LOTTO_LENGTH) {
      throw new LottoError(errorMessage.LOTTO_LENGTH_ERROR);
    }

    if (new Set(lottoNumbers).size !== lottoNumbers.length) {
      throw new LottoError(errorMessage.LOTTO_DUPLICATION_NUMBER);
    }
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
