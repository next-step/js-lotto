import ERROR from '../constants/error.js';
import { LottoNumber } from './LottoNumber.js';
import { LottoReward } from './LottoReward.js';

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

  getLottoReward(lotto) {
    const matchedCount = this.getMatchedCount(lotto);
    const hasBonus = this.hasBonus(lotto);
    if (matchedCount === LottoReward.THIRD.match && !hasBonus) {
      return LottoReward.THIRD;
    }
    return Object.values(LottoReward).find(({ match }) => match === matchedCount);
  }
}
