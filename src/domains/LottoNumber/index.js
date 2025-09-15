export class LottoNumber {
  static Range = { MIN: 1, MAX: 45 };
  static ErrorMessages = {
    OUT_OF_RANGE: `로또는 ${LottoNumber.Range.MIN}~${LottoNumber.Range.MAX} 사이의 숫자를 가진다`,
  };

  #number;

  constructor(number) {
    if (number < LottoNumber.Range.MIN || number > LottoNumber.Range.MAX) {
      throw new Error(LottoNumber.ErrorMessages.OUT_OF_RANGE);
    }

    this.#number = number;
  }

  get value() {
    return this.#number;
  }

  isMatched(lottoNumber) {
    return this.#number === lottoNumber.#number;
  }
}
