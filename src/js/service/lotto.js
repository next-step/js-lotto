import { validateCurry, range } from '../utils/index.js';
import { issueLottos } from '../business/lotto.js';
import {
  MIN_MONEY_UNIT,
  PICKED_LOTTO_NUMBER_COUNT,
  RANGE_FOR_RANDOM_NUMBERS,
  MESSAGE,
} from '../const/constant.js';

const validateMoney = (money) => {
  if (!money) throw MESSAGE.PLZ_INSERT_MONEY;

  if (money < MIN_MONEY_UNIT) throw MESSAGE.ALERT_MIN_AMOUNT_TO_ISSUE_LOTTO;

  if (money % MIN_MONEY_UNIT) throw MESSAGE.PLZ_CHECK_AMOUNT;

  return money;
};

export const buy = (money, { lotto }) => {
  const either = validateCurry(() => validateMoney(money), lotto);
  const amount = money / MIN_MONEY_UNIT;
  const numbers = range(amount, () =>
    issueLottos(PICKED_LOTTO_NUMBER_COUNT, RANGE_FOR_RANDOM_NUMBERS)
  );

  return either(() => ({
    numbers,
    size: amount,
  }));
};
