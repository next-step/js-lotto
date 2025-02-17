import LOTTO_RESULT_ERROR_MESSAGE from "./lottoResultErrorMessage.js";
import hasDuplicate from "../../utils/hasDuplicate.js";
import isWithinRange from "../../utils/isWithinRange.js";
import {
  LOTTO_RANGE_MAX,
  LOTTO_RANGE_MIN,
  LOTTO_DEFAULT_LENGTH,
} from "./constant.js";
class LottoResult {
  winningNumbers;
  bonusNumber;
  tickets;
  constructor({ winningNumbers, bonusNumber, tickets }) {
    const splitWinningNUmbers = winningNumbers.split(",").map(Number);
    LottoResult.lottoResultValidate(splitWinningNUmbers, bonusNumber);

    this.winningNumbers = splitWinningNUmbers;
    this.bonusNumber = bonusNumber;
    this.tickets = tickets;
  }

  // 2개를 왜 받는지 모르겠음
  static lottoResultValidate(winningNumbers, bonusNumber) {
    if (winningNumbers.length !== LOTTO_DEFAULT_LENGTH) {
      throw new Error(
        LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
      );
    }
    if (!bonusNumber) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.BONUS_NUMBER_REQUIRED);
    }

    if (hasDuplicate(winningNumbers, bonusNumber)) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.DUPLICATE_NUMBERS_NOT_ALLOWED);
    }
    const isWithinRangeWinningNumber = isWithinRange(
      winningNumbers,
      LOTTO_RANGE_MAX,
      LOTTO_RANGE_MIN
    );
    const isWithinRangeBonusNumber = isWithinRange(
      bonusNumber,
      LOTTO_RANGE_MAX,
      LOTTO_RANGE_MIN
    );

    if (!isWithinRangeWinningNumber) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);
    }
    if (!isWithinRangeBonusNumber) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  }

  compareSingleTicket(ticket) {
    const matchedNumbers = ticket.filter((item) =>
      this.winningNumbers.includes(item)
    );
    const hasBonus = ticket.includes(this.bonusNumber);
    return { ticket, matchedNumbers, hasBonus };
  }

  compareNumber() {
    return this.tickets.map((ticket) => this.compareSingleTicket(ticket));
  }

  getWinnersNumber() {
    return {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    };
  }
}

export default LottoResult;
