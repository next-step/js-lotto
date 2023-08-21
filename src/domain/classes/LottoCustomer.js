import { ERROR_MESSAGE } from '../constants/index';
import { isPositiveNumber } from '../../utils/index';

class LottoCustomer {
  #amount = 0;

  constructor(amount) {
    LottoCustomer.validateAmount(amount);
    this.#amount = Number(amount);
  }

  static validateAmount(amount) {
    if (!isPositiveNumber(amount)) {
      throw ERROR_MESSAGE.INVALID_AMOUNT_BY_NOT_POSITIVE_AMOUNT;
    }
  }

  get amount() {
    return this.#amount;
  }
}

export default LottoCustomer;
