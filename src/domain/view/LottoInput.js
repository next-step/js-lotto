import { parseSeparatedNumbers, readlineUtils } from '../../util/index.js';
import { MESSAGES } from '../constants/index.js';
import {
  validateWinningNumber,
  validateInputPrice,
  validateBonusNumer,
  validateRetry,
} from '../validator.js';

export const LottoInput = {
  async ASK_MONEY() {
    return await readlineUtils.questionReadline(MESSAGES.ASK_PURCHASE_MONEY, validateInputPrice);
  },

  async ASK_WINNING_NUMBERS() {
    const winningNumber = await readlineUtils.questionReadline(
      MESSAGES.ASK_WINNING_NUMBER,
      validateWinningNumber,
    );

    return parseSeparatedNumbers(winningNumber);
  },

  async ASK_BONUS_NUMBER(winningNumbers) {
    return await readlineUtils.questionReadline(MESSAGES.ASK_BONUS_NUMBER, (BONUS) =>
      validateBonusNumer(winningNumbers, BONUS),
    );
  },

  async ASK_RETRY() {
    const retry = await readlineUtils.questionReadline(MESSAGES.ASK_RETRY, (RETRY) =>
      validateRetry(RETRY),
    );

    return retry.toLowerCase();
  },

  EXIT_LOTTO_STORE() {
    return readlineUtils.closeReadline();
  }
}
