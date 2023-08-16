import ERROR from '../constants/error.js';
import { LOTTO_NUMBER_QUANTITY } from '../constants/lotto-config.js';
import { isBeyondNumberRange } from './common.js';

const isUnmatchedNumberQuantity = (value) => value !== LOTTO_NUMBER_QUANTITY;

const checkValidWinningNumbers = (numbers) => {
  const numberLog = new Set();
  if (isUnmatchedNumberQuantity(numbers.length)) throw new Error(ERROR.WINNING_NUMBERS.UNMATCHED_QUANTITY);
  numbers.forEach((number) => {
    if (isBeyondNumberRange(number)) throw new Error(ERROR.WINNING_NUMBERS.BEYOND_NUMBER_RANGE);
    if (numberLog.has(number)) throw new Error(ERROR.WINNING_NUMBERS.DO_NOT_ENTER_DUPLICATED_NUMBER);
    numberLog.add(number);
  });
};

export default checkValidWinningNumbers;
