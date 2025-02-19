import {
  ERROR_MESSAGES,
  LOTTO_NUMBERS_COUNT,
  LOTTO_NUMBER_RANGE,
} from "../../constants.js";
import {
  isValueInArray,
  isValidNumberInRange,
  isValidNumberArray,
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
      return { rank: 1 };
    }
    if (matchCount === 5 && ticket.includes(this.bonusNumber)) {
      return { rank: 2 };
    }
    if (matchCount === 5) {
      return { rank: 3 };
    }
    if (matchCount === 4) {
      return { rank: 4 };
    }
    if (matchCount === 3) {
      return { rank: 5 };
    }
    return { rank: 0 };
  }

  calculateAllRanks(tickets) {
    return tickets.map((ticket) => this.calculateRank(ticket));
  }

  getWinningRanks(tickets) {
    const results = this.calculateAllRanks(tickets);
    const rankCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    results.forEach(({ rank }) => {
      if (rank > 0) {
        rankCount[rank] += 1;
      }
    });

    return rankCount;
  }

  validateNumbers(winningNumbers, bonusNumber) {
    if (!isValidNumberArray(winningNumbers, LOTTO_NUMBER_RANGE)) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_INVALID);
    }
    if (winningNumbers.length !== LOTTO_NUMBERS_COUNT) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_LENGTH);
    }
    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS_DUPLICATE);
    }
    if (isValueInArray(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_INVALID);
    }
    if (!isValidNumberInRange(bonusNumber, LOTTO_NUMBER_RANGE)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_INVALID);
    }
  }
}
