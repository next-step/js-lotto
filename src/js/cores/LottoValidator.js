import {
  PRICE,
  HIGHEST_MONEY_LIMIT,
  LOWEST_MONEY_LIMIT,
  NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT,
  NOT_UPPER_THAN_LOWER_LIMIT,
  NOT_LOWER_THAN_UPPER_LIMIT,
  NOT_ALL_NUMBERS_INPUT,
  WINNING_BOUNS_NUMBER_COUNT,
  WINNING_MIN_NUMBER,
  NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER,
  WINNING_MAX_NUMBER,
  NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER,
  EMPTY_INPUT_NUMBER,
  NOT_ALL_NUMBERS_UNIQUE,
} from '../constants/index.js';

export class LottoValidator {
  constructor() {}

  isDivisibleMoneyByThousand(money) {
    if (money % PRICE === 0) return true;

    alert(NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT);

    return false;
  }

  isLowerThanHighestLimit(money) {
    if (money <= HIGHEST_MONEY_LIMIT) return true;

    alert(NOT_LOWER_THAN_UPPER_LIMIT);

    return false;
  }

  isUpperThanLowestLimit(money) {
    if (money >= LOWEST_MONEY_LIMIT) return true;

    alert(NOT_UPPER_THAN_LOWER_LIMIT);

    return false;
  }

  isAllWinningNumbersInput(winningNumbers, bonusNumber) {
    if (
      [...winningNumbers, bonusNumber].length === WINNING_BOUNS_NUMBER_COUNT &&
      !winningNumbers.includes(EMPTY_INPUT_NUMBER) &&
      bonusNumber !== EMPTY_INPUT_NUMBER
    )
      return true;

    alert(NOT_ALL_NUMBERS_INPUT);

    return false;
  }

  isAllWinningNumbersUpperThanMinNumber(winningNumbers, bonusNumber) {
    if (
      [...winningNumbers, bonusNumber].every(
        (winningNumber) => winningNumber >= WINNING_MIN_NUMBER
      )
    )
      return true;

    alert(NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER);

    return false;
  }

  isAllWinningNumbersLowerThanMaxNumber(winningNumbers, bonusNumber) {
    if (
      [...winningNumbers, bonusNumber].every(
        (winningNumber) => winningNumber <= WINNING_MAX_NUMBER
      )
    )
      return true;

    alert(NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER);

    return false;
  }

  isAllWinningNumbersUnique(winningNumbers, bonusNumber) {
    const numbers = [...winningNumbers, bonusNumber];

    if (new Set(numbers).size === numbers.length) return true;

    alert(NOT_ALL_NUMBERS_UNIQUE);

    return false;
  }
}
