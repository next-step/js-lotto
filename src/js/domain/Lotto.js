import { LottoNumber } from './LottoNumber.js';

export class Lotto {
  static NUMBER_QUANTITY = 6;

  _numbers;

  constructor(numbers) {
    this._numbers = numbers.map((number) => new LottoNumber(number)).sort((a, b) => a.value - b.value);
  }

  get numbers() {
    return this._numbers.map(({ value }) => value);
  }

  match(number) {
    return this._numbers.some(({ value }) => value === number);
  }
}
