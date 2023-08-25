import ERROR from '../constants/error.js';

export class LottoNumber {
  static MIN = 1;

  static MAX = 45;

  static #numbers = Object.fromEntries(
    Array.from({ length: LottoNumber.MAX }, (_, i) => [i + 1, new LottoNumber(i + 1)])
  );

  #value;

  constructor(number) {
    this.#value = number;
  }

  get value() {
    return this.#value;
  }

  static valueOf(number) {
    const lottoNumber = LottoNumber.#numbers[number];
    if (!lottoNumber) {
      throw new Error(ERROR.BEYOND_NUMBER_RANGE(LottoNumber.MIN, LottoNumber.MAX));
    }
    return lottoNumber;
  }
}
