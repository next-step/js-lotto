export class LottoNumber {
  static RANGE = {
    MIN: 1,
    MAX: 45,
  };

  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    if (value < LottoNumber.RANGE.MIN || value > LottoNumber.RANGE.MAX) {
      throw new Error(
        `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: ${value}`
      );
    }

    return new LottoNumber(value);
  }

  equals(lottoNumber) {
    return this.#value === lottoNumber.value;
  }

  get value() {
    return this.#value;
  }
}
