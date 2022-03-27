import {
  PRICE,
  UPPER_LIMIT_MONEY,
  LOWER_LIMIT_MONEY,
  NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT,
  NOT_UPPER_THAN_LOWER_LIMIT,
  NOT_LOWER_THAN_UPPER_LIMIT,
} from '../constants/index.js';

export class LottoValidator {
  constructor() {}

  isDivisibleMoneyByThousand(money) {
    if (money % PRICE === 0) return true;

    alert(NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT);

    return false;
  }

  isLowerThanUpperLimit(money) {
    if (money <= UPPER_LIMIT_MONEY) return true;

    alert(NOT_LOWER_THAN_UPPER_LIMIT);

    return false;
  }

  isUpperThanLowerLimit(money) {
    if (money >= LOWER_LIMIT_MONEY) return true;

    alert(NOT_UPPER_THAN_LOWER_LIMIT);

    return false;
  }
}
