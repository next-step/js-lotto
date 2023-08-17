import { ERROR_MESSAGE } from '../constants/error-message';
import { LOTTO_AMOUNT_UNIT } from '../constants/lotto';
import { getNullArray } from '../utils/array';
import { Lotto } from './Lotto';

export class LottoMachine {
  issueLotto(money) {
    const amount = parseInt(money, 10);

    this.#validateMoneyUnit(amount, LOTTO_AMOUNT_UNIT);

    const nullArray = getNullArray(this.#getNumberOfLotto(amount));

    return nullArray.map(() => new Lotto());
  }

  #getNumberOfLotto(amount) {
    return amount / LOTTO_AMOUNT_UNIT;
  }

  #validateMoneyUnit(amount, unit) {
    if (amount === 0 || amount % unit !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_AMOUNT_UNIT(unit));
    }
  }
}
