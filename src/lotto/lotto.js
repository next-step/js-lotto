import { print } from '../utils/common.util.js';
import {
  QUESTION_PURCHASE_AMOUNT,
  LOTTO_AMOUNT_UNIT,
} from '../constants/lotto.const.js';
import { REGEX_NUMBERS } from '../constants/regex.const.js';
import { ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE } from '../constants/error.const.js';

class Lotto {
  #readline = null;

  constructor(readline) {
    this.#readline = readline;
  }

  start() {
    this.#readline.question(QUESTION_PURCHASE_AMOUNT, (purchaseAmount) => {
      if (!this.validatePurchaseAmount(purchaseAmount)) {
        print(ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE);
        this.#readline.close();
      }
    });
  }

  validatePurchaseAmount(amount) {
    const inValidNumbers = REGEX_NUMBERS.test(amount);
    const isValidUnit = parseInt(amount) % LOTTO_AMOUNT_UNIT === 0;

    if (!inValidNumbers || !isValidUnit) {
      return false;
    }

    return true;
  }
}

export default Lotto;
