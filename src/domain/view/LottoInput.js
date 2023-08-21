import { parseSeparatedNumbers, readlineUtils } from '../../util/index.js';
import { MESSAGES } from '../constants/index.js';
import {
  validateWinningNumber,
  validateInputPrice,
  validateBonusNumer,
  validateRetry,
} from '../validator.js';

export class LottoInput {
  static async ASK_MONEY() {
    return await readlineUtils.questionReadline(MESSAGES.ASK_PURCHASE_MONEY, validateInputPrice);
  }

  static async ASK_WINNING_NUMBERS() {
    const winningNumber = await readlineUtils.questionReadline(
      MESSAGES.ASK_WINNING_NUMBER,
      validateWinningNumber,
    );

    return parseSeparatedNumbers(winningNumber);
  }

  static async ASK_BONUS_NUMBER(winningNumbers) {
    return await readlineUtils.questionReadline(MESSAGES.ASK_BONUS_NUMBER, (BONUS) =>
      validateBonusNumer(winningNumbers, BONUS),
    );
  }

  static async ASK_RETRY() {
    const retry = await readlineUtils.questionReadline(MESSAGES.ASK_RETRY, (RETRY) =>
      validateRetry(RETRY),
    );

    return retry.toLowerCase();
  }

  static EXIT_LOTTO_STORE() {
    return readlineUtils.closeReadline();
  }
}
