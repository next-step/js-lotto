import {
  ERROR_MESSAGE_COMMA_SEPARTED,
  ERROR_MESSAGE_INPUT_PURCHASE_PRICE,
  ERROR_MESSAGE_LACK_MONEY,
  ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER,
  ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS,
  LOTTO_PRICE,
  LOTTO_TOTAL_COUNT,
  MIN_INPUT_NUMBERS_LENGTH,
} from '../constants';

class LottoValidator {
  validateArguments(arg) {
    if (arg.length !== 1) {
      reject(new Error(ERROR_MESSAGE_ACGUMENTS_LENGTH));
    }
  }

  validateQuery(query, type) {
    if (typeof query !== type) {
      reject(new Error(ERROR_MESSAGE_QUERY_TYPE));
    }
  }

  validInputNumber(price) {
    if (Number.isNaN(Number(price))) {
      throw new Error(ERROR_MESSAGE_INPUT_PURCHASE_PRICE);
    }
  }

  validWinningNumberSplitComma(numbers) {
    if (numbers.split(',').length <= MIN_INPUT_NUMBERS_LENGTH) {
      throw new Error(ERROR_MESSAGE_COMMA_SEPARTED);
    }
  }

  validCheckAmount(prices) {
    if (prices < LOTTO_PRICE) throw new Error(ERROR_MESSAGE_LACK_MONEY);
  }

  validEnterWinningNumbers(winnigNumbers) {
    if (winnigNumbers.length !== LOTTO_TOTAL_COUNT)
      throw new Error(ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS);
  }

  validEnterBonusNumber(bonusNumber) {
    if (bonusNumber === 0) throw new Error(ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER);
  }
}

export default LottoValidator;
