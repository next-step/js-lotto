import ERROR from '../constants/error.js';
import { Lotto } from './Lotto.js';
import { LottoNumber } from './LottoNumber.js';

export class WinningLotto extends Lotto {
  #bonus;

  constructor(numbers, bonus) {
    super(numbers);
    WinningLotto.#validate(numbers, bonus);
    this.#bonus = new LottoNumber(bonus);
  }

  static #validate(numbers, bonus) {
    if (numbers.includes(bonus)) {
      throw new Error(ERROR.DUPLICATED_WITH_WINNING_NUMBER);
    }
  }

  getMatchedCount(lotto) {
    return this._numbers.reduce((acc, { value }) => (lotto.match(value) ? acc + 1 : acc), 0);
  }

  hasBonus(lotto) {
    return lotto.match(this.#bonus.value);
  }
}
