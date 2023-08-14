import { splitString, manipulateReadline } from '../util/index.js';
import { MESSAGES } from '../domain/constants/index.js';
import {
  validateInputPrice,
  validateWinningNumber,
  validateBonusNumer,
} from '../domain/validator.js';
import { LottoClerk } from '../domain/controller/LottoClerk.js';

async function main() {
  const clerk = new LottoClerk();
  const BUDGET = await manipulateReadline.questionReadline(
    MESSAGES.ASK_PURCHASE_MONEY,
    validateInputPrice,
  );
  clerk.purchaseLotto(BUDGET);

  const WINNING_NUMBERS = await manipulateReadline.questionReadline(
    MESSAGES.ASK_WINNING_NUMBER,
    validateWinningNumber,
  );
  const BONUS_NUMBER = await manipulateReadline.questionReadline(
    MESSAGES.ASK_BONUS_NUMBER,
    (BONUS) => validateBonusNumer(splitString(WINNING_NUMBERS), BONUS),
  );
  clerk.checkoutLotto(splitString(WINNING_NUMBERS).map(Number), Number(BONUS_NUMBER));
}

main();
