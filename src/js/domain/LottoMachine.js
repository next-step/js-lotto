import { ERROR_MESSAGE } from '../constants/error-message';
import { LOTTO_AMOUNT_UNIT, LOTTO_NUMBERS_LENGTH } from '../constants/lotto';
import { getNullArray } from '../utils/array';
import { getRandomNumber } from '../utils/number';
import { Lotto } from './Lotto';

export class LottoMachine {
  issueLotto(money) {
    const amount = parseInt(money, 10);

    this.#validateMoneyUnit(amount, LOTTO_AMOUNT_UNIT);

    const nullArray = getNullArray(this.#getNumberOfLotto(amount));

    return nullArray.map(() => new Lotto(this.#generateLottoNumbers()));
  }

  #getNumberOfLotto(amount) {
    return amount / LOTTO_AMOUNT_UNIT;
  }

  #generateLottoNumbers() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBERS_LENGTH) {
      const randomNumber = getRandomNumber(1, 45);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  #validateMoneyUnit(amount, unit) {
    if (amount === 0 || amount % unit !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_AMOUNT_UNIT(unit));
    }
  }
}
