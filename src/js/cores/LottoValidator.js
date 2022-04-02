import {
  PRICE,
  UPPER_LIMIT_MONEY,
  LOWER_LIMIT_MONEY,
  NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT,
  NOT_UPPER_THAN_LOWER_LIMIT,
  NOT_LOWER_THAN_UPPER_LIMIT,
  NOT_ALL_NUMBERS_INPUT,
  WINNING_BOUNS_NUMBER_COUNT,
  WINNING_MIN_NUMBER,
  NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER,
  WINNING_MAX_NUMBER,
  NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER,
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

  isAllWinningNumbersInput(winningNumbers) {
    if (winningNumbers.length === WINNING_BOUNS_NUMBER_COUNT) return true;

    alert(NOT_ALL_NUMBERS_INPUT);

    return false;
  }

  isAllWinningNumbersUpperThanMinNumber(winningNumbers) {
    if (
      winningNumbers.every(
        (winningNumber) => winningNumber >= WINNING_MIN_NUMBER
      )
    )
      return true;

    alert(NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER);

    return false;
  }

  isAllWinningNumbersLowerThanMaxNumber(winningNumbers) {
    if (
      winningNumbers.every(
        (winningNumber) => winningNumber <= WINNING_MAX_NUMBER
      )
    )
      return true;

    alert(NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER);

    return false;
  }
}
