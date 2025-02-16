import { ERROR_MESSAGES, LOTTO_NUMBERS_COUNT } from "../../constants.js";
import {
  isDuplicateNumbersInArray,
  isPositiveInteger,
  isPositiveIntegerArray,
} from "../../validation.js";

export class LottoResult {
  constructor(winningNumbers, bonusNumber) {
    this.validateNumbers(winningNumbers, bonusNumber);
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  validateNumbers(winningNumbers, bonusNumber) {
    if (!isPositiveIntegerArray(winningNumbers)) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_INVALID);
    }
    if (winningNumbers.length !== LOTTO_NUMBERS_COUNT) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_LENGTH);
    }
    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_DUPLICATE);
    }
    if (isDuplicateNumbersInArray(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
    }
    if (!isPositiveInteger(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_INVALID);
    }
  }
}
