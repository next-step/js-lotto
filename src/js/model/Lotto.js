import { LOTTO_NUMBERS } from '../utils/constants.js';
import { getRandomNumber } from '../utils/utils.js';

export default class Lotto {
  constructor() {
    this._numbers = new Set();
    this.initNumbers();
  }

  initNumbers() {
    while (this._numbers.size < LOTTO_NUMBERS.LOTTO_COUNT) {
      this._numbers.add(getRandomNumber());
    }
  }

  get numbers() {
    return this._numbers;
  }

  get numberDetailString() {
    return [...this._numbers.values()].join(', ');
  }
}
