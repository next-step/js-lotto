import ERROR from '../constants/error.js';
import { LottoNumber } from './LottoNumber.js';

export class Lotto {
  static NUMBER_QUANTITY = 6;

  _numbers;

  constructor(numbers) {
    this._numbers = numbers.map((number) => new LottoNumber(number)).sort((a, b) => a.value - b.value);
    Lotto.#validate(numbers);
  }

  get numbers() {
    return this._numbers.map(({ value }) => value);
  }

  static #validate(numbers) {
    if (numbers.length !== Lotto.NUMBER_QUANTITY) {
      throw new Error(ERROR.UNMATCHED_QUANTITY(Lotto.NUMBER_QUANTITY));
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.DO_NOT_ENTER_DUPLICATED_NUMBER);
    }
  }

  match(number) {
    return this._numbers.some(({ value }) => value === number);
  }
}
