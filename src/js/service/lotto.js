import { range, successOrFailureCurry, swap } from '../utils/index.js';
import {
  MIN_MONEY_UNIT,
  PICKED_LOTTO_NUMBER_COUNT,
  RANGE_FOR_RANDOM_NUMBERS,
  MESSAGE,
} from '../const/constant.js';

const validateMoney = money => {
  if (!money) throw MESSAGE.PLZ_INSERT_MONEY;

  if (money < MIN_MONEY_UNIT) throw MESSAGE.ALERT_MIN_AMOUNT_TO_ISSUE_LOTTO;

  if (money % MIN_MONEY_UNIT) throw MESSAGE.PLZ_CHECK_AMOUNT;

  return money;
};

const generateRandomNumbers = max => {
  const maxIdx = max - 1;
  const candidates = range(max, i => i + 1);

  candidates.forEach((_, i, arr) => swap(maxIdx, i, arr));

  return candidates;
};

export const issueLottos = (limit, range) =>
  generateRandomNumbers(range)
    .slice(0, limit)
    .sort((a, b) => a - b);

const createNewLottoState = money => {
  const amount = money / MIN_MONEY_UNIT;
  const numbers = range(amount).map(() =>
    issueLottos(PICKED_LOTTO_NUMBER_COUNT, RANGE_FOR_RANDOM_NUMBERS),
  );

  return {
    numbers,
    count: amount,
  };
};

export const buy = (money, prevLottoState) => {
  const successOrFailure = successOrFailureCurry(money);

  return successOrFailure(
    money => {
      validateMoney(money);
      return createNewLottoState(money);
    },
    error => {
      alert(error);
      return prevLottoState;
    },
  );
};
