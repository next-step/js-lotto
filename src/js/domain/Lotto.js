import LottoNumber from "./LottoNumber";

class Lotto {
  static LOTTO_PRICE = 1000;

  #numbers = [];

  constructor(lottoNumbers) {
    LottoNumber.validateLottoNumbers(lottoNumbers);
    this.#numbers = LottoNumber.convertLottoNumbersToArray(lottoNumbers);
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
