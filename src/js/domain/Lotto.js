import ERROR from '../constants/error.js';
import { LottoNumber } from './LottoNumber.js';

export class Lotto {
  static PRICE = 1_000;

  static NUMBER_QUANTITY = 6;

  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers.map((number) => new LottoNumber(number)).sort((a, b) => a.value - b.value);
  }

  get numbers() {
    return this.#numbers.map(({ value }) => value);
  }

  static of(numbers) {
    return new Lotto(numbers);
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
    return this.numbers.includes(number);
  }
}
