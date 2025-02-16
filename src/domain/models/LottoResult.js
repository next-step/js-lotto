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

  countMatchingNumber(thicketNumbers) {
    return thicketNumbers.filter((thicketNumber) =>
      this.winningNumbers.includes(thicketNumber),
    ).length;
  }

  calculateRank(ticket) {
    const matchCount = this.countMatchingNumber(ticket);

    if (matchCount === 6) {
      return { rank: 1, prize: "20억 원" };
    }
    if (matchCount === 5 && ticket.includes(this.bonusNumber)) {
      return { rank: 2, prize: "3천만 원" };
    }
    if (matchCount === 5) {
      return { rank: 3, prize: "150만 원" };
    }
    if (matchCount === 4) {
      return { rank: 4, prize: "5만 원" };
    }
    if (matchCount === 3) {
      return { rank: 5, prize: "5천 원" };
    }
    return { rank: 0, prize: "꽝" };
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
