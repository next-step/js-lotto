import Lotto from './Lotto.js';
import { ERROR_MESSAGES, LOTTO_WINNING_MAP, RULES } from './constants.js';
import { getIntersection } from './utils/utils.js';

export function validatePurchaseMoney(money) {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_MONEY_TYPE);
  }
  if (!money || money % RULES.LOTTO_PRICE !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_MONEY_UNIT);
  }
}

export function validateLottoNumber(number) {
  if (
    Number.isNaN(number) ||
    number < RULES.LOTTO_NUMBERS_RANGE[0] ||
    number > RULES.LOTTO_NUMBERS_RANGE[1]
  ) {
    throw new Error(ERROR_MESSAGES.INVALID_LOTTO_NUMBERS_RANGE);
  }
}

export function validateLottoNumbers(numbers) {
  if (
    !Array.isArray(numbers) ||
    numbers.length !== RULES.LOTTO_NUMBERS_LENGTH + 1
  ) {
    throw new Error(ERROR_MESSAGES.INVALID_LOTTO_NUMBERS_LENGTH);
  }
  const NUMBERS_SET = [...new Set(numbers)];
  if (NUMBERS_SET.length !== numbers.length) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_LOTTO_NUMBERS);
  }
  numbers.forEach(validateLottoNumber);
}

class LottoMachine {
  lottos = [];

  winNumbers = [];

  bonusNumber;

  purchaseLottos(money) {
    validatePurchaseMoney(money);

    this.lottos = Array(money / RULES.LOTTO_PRICE).fill(new Lotto());
  }

  setWinNumbers(numbers, bonusNumber) {
    validateLottoNumbers([...numbers, bonusNumber]);
    this.winNumbers = numbers;
    this.bonusNumber = bonusNumber;
  }

  calculateWinningResult(numbers) {
    const matchCount = getIntersection(this.winNumbers, numbers).length;
    const isBonus = numbers.includes(this.bonusNumber);

    const isMatchWinningCondition = ({ condition }) =>
      condition.n === matchCount && Boolean(condition.b) === isBonus;

    return LOTTO_WINNING_MAP.find(isMatchWinningCondition);
  }
}

export default LottoMachine;
