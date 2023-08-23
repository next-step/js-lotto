import ERROR from '../constants/error.js';
import Lotto from './Lotto.js';
import { LottoNumber } from './LottoNumber.js';

export class WinningLotto extends Lotto {
  #bonus;

  constructor(numbers, bonus) {
    super(numbers);
    WinningLotto.#validate(numbers, bonus);
    this.#bonus = new LottoNumber(bonus);
  }

  static #validate(numbers, bonus) {
    if (numbers.length !== Lotto.NUMBER_QUANTITY) {
      throw new Error(ERROR.WINNING_NUMBERS.UNMATCHED_QUANTITY);
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.WINNING_NUMBERS.DO_NOT_ENTER_DUPLICATED_NUMBER);
    }

    if (numbers.includes(bonus)) {
      throw new Error(ERROR.BONUS.DUPLICATED_WITH_WINNING_NUMBER);
    }
  }
}
