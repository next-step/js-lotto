import ERROR from '../constants/error.js';
import { LottoNumber } from './LottoNumber.js';

export class WinningLotto {
  #lotto;

  #bonus;

  constructor(lotto, bonus) {
    WinningLotto.#validate(lotto, bonus);
    this.#lotto = lotto;
    this.#bonus = new LottoNumber(bonus);
  }

  static #validate(lotto, bonus) {
    if (lotto.match(bonus)) {
      throw new Error(ERROR.DUPLICATED_WITH_WINNING_NUMBER);
    }
  }

  getMatchedCount(lotto) {
    return lotto.numbers.reduce((acc, cur) => (this.#lotto.match(cur) ? acc + 1 : acc), 0);
  }

  hasBonus(lotto) {
    return lotto.match(this.#bonus.value);
  }
}
