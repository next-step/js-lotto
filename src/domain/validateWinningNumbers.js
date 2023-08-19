import {validateOnlyNumber} from '../utils';
import {MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from './constants';

export const VALIDATE_WINNING_NUMBERS_ERROR = {
  INVALID_LENGTH: '6개의 숫자를 ,로 구분해서 입력해주세요.',
  NOT_IN_RANGE: `${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER}사이의 숫자를 입력해주세요.`,
  DUPLICATED: '중복되는 숫자없이 입력해주세요.',
};

export const validateWinningNumbers = text => {
  const winningNumbers = text.split(',');

  if (winningNumbers.length !== 6) {
    throw new Error(VALIDATE_WINNING_NUMBERS_ERROR.INVALID_LENGTH);
  }

  winningNumbers.forEach(numberString => {
    validateOnlyNumber(numberString);

    const number = Number(numberString);

    if (number < MIN_LOTTO_NUMBER || number > MAX_LOTTO_NUMBER) {
      throw new Error(VALIDATE_WINNING_NUMBERS_ERROR.NOT_IN_RANGE);
    }
  });

  const winningNumberSet = new Set(winningNumbers);

  if (winningNumberSet.size !== 6) {
    throw new Error(VALIDATE_WINNING_NUMBERS_ERROR.DUPLICATED);
  }
};
