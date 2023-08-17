import { parseSeparatedNumbers, readlineUtils } from '../../util/index.js';
import { MESSAGES } from '../constants/index.js';
import { validateWinningNumber, validateInputPrice, validateBonusNumer } from '../validator.js';

export class LottoInput {
  static async ASK_MONEY() {
    const budget = await readlineUtils.questionReadline(
      MESSAGES.ASK_PURCHASE_MONEY,
      validateInputPrice,
    );

    return budget;
  }

  static async ASK_WINNING_NUMBERS() {
    const winningNumber = await readlineUtils.questionReadline(
      MESSAGES.ASK_WINNING_NUMBER,
      validateWinningNumber,
    );

    return parseSeparatedNumbers(winningNumber);
  }

  static async ASK_BONUS_NUMBER(winningNumbers) {
    const bonusNumber = await readlineUtils.questionReadline(MESSAGES.ASK_BONUS_NUMBER, (BONUS) =>
      validateBonusNumer(winningNumbers, BONUS),
    );
    return bonusNumber;
  }

  static EXIT_LOTTO_STORE() {
    readlineUtils.closeReadline();
  }
}
