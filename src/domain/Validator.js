import {
  ERROR_MESSAGES,
  LOTTO_NUMBER_RANGE,
  lottoPrice,
  WINNING_PLUS_BONUS,
} from "../utils/constants.js";

class Validator {
  constructor() {}

  validatePurchaseAmount(purchaseAmount) {
    if (!this.isValidNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGES.MUST_BE_INTEGER);
    }

    if (!this.isAboveMinimum(purchaseAmount)) {
      throw new Error(ERROR_MESSAGES.MUST_BE_ABOVE_MINIMUM);
    }
  }

  validateWinningNumbers(winningNumbers) {
    if (
      winningNumbers.length === 0 ||
      winningNumbers.length !== WINNING_PLUS_BONUS
    ) {
      throw new Error(ERROR_MESSAGES.MUST_BE_SEVEN_DIGITS);
    }

    const isNumber = winningNumbers.every((number) =>
      this.isValidNumber(number)
    );
    if (!isNumber) {
      throw new Error(ERROR_MESSAGES.MUST_BE_INTEGER);
    }

    if (!this.isInRange(winningNumbers)) {
      throw new Error(ERROR_MESSAGES.MUST_BE_IN_RANGE);
    }

    if (this.isDuplicate(winningNumbers)) {
      throw new Error(ERROR_MESSAGES.MUST_BE_NOT_DUPLICATE);
    }
  }

  splitBy(string, separate) {
    return string.split(separate);
  }

  isInRange(numbers) {
    const numberArray = numbers.map(Number);
    return numberArray.every(
      (number) =>
        number >= LOTTO_NUMBER_RANGE.MINIMUM &&
        number <= LOTTO_NUMBER_RANGE.MAXIMUM
    );
  }

  isDuplicate(numbers) {
    const uniqueNumbers = new Set(numbers);
    return uniqueNumbers.size !== numbers.length;
  }

  isValidNumber(value) {
    const number = Number(value);
    return !isNaN(Number(number)) && Number.isInteger(number);
  }

  isAboveMinimum(number) {
    return number >= lottoPrice;
  }
}

export default Validator;
