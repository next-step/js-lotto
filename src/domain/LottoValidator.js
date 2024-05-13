import {
  ERROR_MESSAGE_ACGUMENTS_LENGTH,
  ERROR_MESSAGE_QUERY_TYPE,
  ERROR_MESSAGE_INPUT_PURCHASE_PRICE,
  ERROR_MESSAGE_COMMA_SEPARTED,
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
}

export default LottoValidator;
