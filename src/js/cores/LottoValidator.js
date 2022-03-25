import {
  PRICE,
  UPPER_LIMIT_MONEY,
  LOWER_LIMIT_MONEY,
} from '../constants/index.js';

export class LottoValidator {
  constructor() {}

  isDivisibleMoneyByThousand(money) {
    if (money % PRICE === 0) return true;

    return false;
  }

  isLowerThanUpperLimit(money) {
    if (money <= UPPER_LIMIT_MONEY) return true;

    return false;
  }

  isUpperThanLowerLimit(money) {
    if (money >= LOWER_LIMIT_MONEY) return true;

    return false;
  }
}
