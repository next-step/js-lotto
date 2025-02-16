import LOTTO_RESULT_ERROR_MESSAGE from "../utils/errorMessage/lottoResultErrorMessage.js";
import hasDuplicate from "../utils/hasDuplicate.js";
import isWithinRange from "../utils/isWithinRange.js";

const max = 45;
const min = 1;
class LottoResult {
  constructor(winningNumbers, bonusNumber) {
    LottoResult.lottoResultValidate(winningNumbers, bonusNumber);

    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  static lottoResultValidate(winningNumbers, bonusNumber) {
    if (winningNumbers.length !== 6) {
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
    const isWithinRangeWinningNumber = isWithinRange(winningNumbers, max, min);
    const isWithinRangeBonusNumber = isWithinRange(bonusNumber, max, min);

    if (!isWithinRangeWinningNumber) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);
    }
    if (!isWithinRangeBonusNumber) {
      throw new Error(LOTTO_RESULT_ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  }

  static compareSingleTicket(ticket, winningNumbers, bonusNumber) {
    const matchedNumbers = ticket.filter((item) =>
      winningNumbers.includes(item)
    );
    const hasBonus = ticket.includes(bonusNumber);
    return { ticket, matchedNumbers, hasBonus };
  }

  compareNumber(tickets) {
    return tickets.map((ticket) =>
      LottoResult.compareSingleTicket(
        ticket,
        this.winningNumbers,
        this.bonusNumber
      )
    );
  }

  getWinnersNumber() {
    return {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    };
  }
}

export default LottoResult;
