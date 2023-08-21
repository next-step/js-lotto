import { MESSAGES } from '../domain/constants/index.js';
import { LottoClerk } from '../domain/controller/LottoClerk.js';
import {
  validateBonusNumer,
  validateInputPrice,
  validateWinningNumber,
} from '../domain/validator.js';
import { parseSeparatedNumbers, readlineUtils } from '../util/index.js';

async function main() {
  const clerk = new LottoClerk();
  const BUDGET = await readlineUtils.questionReadline(
    MESSAGES.ASK_PURCHASE_MONEY,
    validateInputPrice,
  );
  clerk.purchaseLotto(BUDGET);

  const WINNING_NUMBERS = await readlineUtils.questionReadline(
    MESSAGES.ASK_WINNING_NUMBER,
    validateWinningNumber,
  );
  const BONUS_NUMBER = await readlineUtils.questionReadline(MESSAGES.ASK_BONUS_NUMBER, (BONUS) =>
    validateBonusNumer(parseSeparatedNumbers(WINNING_NUMBERS), BONUS),
  );
  clerk.checkoutLotto(parseSeparatedNumbers(WINNING_NUMBERS).map(Number), Number(BONUS_NUMBER));
}

main();
