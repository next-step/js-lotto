import ERROR from '../constants/error.js';

export class LottoNumber {
  static MIN = 1;

  static MAX = 45;

  #value;

  constructor(number) {
    LottoNumber.#validate(number);
    this.#value = number;
  }

  get value() {
    return this.#value;
  }

  static #validate(number) {
    if (number < LottoNumber.MIN || number > LottoNumber.MAX || typeof number !== 'number') {
      throw new Error(ERROR.BEYOND_NUMBER_RANGE(LottoNumber.MIN, LottoNumber.MAX));
    }
  }
}
