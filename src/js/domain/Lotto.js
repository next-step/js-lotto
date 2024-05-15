import LottoNumber from "./LottoNumber";

class Lotto {
  static LOTTO_PRICE = 1000;

  #numbers = [];

  constructor(input) {
    LottoNumber.validateLottoNumbers(input);
    const lottoNumbers = LottoNumber.convertLottoNumbersToArray(input);
    this.#numbers = lottoNumbers;
  }

  get numbers() {
    return [...this.#numbers];
  }

  countMatchingLottoNumbers(lottoNumbers) {
    const matchedLottoNumbers = this.#numbers.filter((lottoNumber) =>
      lottoNumbers.includes(lottoNumber)
    );
    return matchedLottoNumbers.length;
  }

  hasLottoNumber(lottoNumber) {
    return this.#numbers.includes(lottoNumber);
  }
}

export default Lotto;
