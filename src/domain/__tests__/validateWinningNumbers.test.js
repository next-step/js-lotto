import {VALIDATE_ONLY_NUMBER_ERROR} from '../../utils/validateOnlyNumber';
import {MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../constants';
import {validateWinningNumbers, VALIDATE_WINNING_NUMBERS_ERROR} from '../validateWinningNumbers';

describe('validateWinningNumber function', () => {
  test.each(['1,2,3,4,5,6', '15,10,9,44,43,45', '1,20,25,30,40,45'])(
    `문자열은 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER}사이의 6개의 숫자가 ,로 구분되어야 한다.`,
    text => {
      expect(() => validateWinningNumbers(text)).not.toThrow();
    },
  );

  test.each(['1', '1,2,3,4,5', '1,2,3,4,5,6,7', '1,2,3,4,5,6,7,8'])(
    '문자열이 6개의 숫자가 아니면 에러가 발생한다.',
    text => {
      expect(() => validateWinningNumbers(text)).toThrow(VALIDATE_WINNING_NUMBERS_ERROR.INVALID_LENGTH);
    },
  );

  test.each(['1a,2,3,4,5,6', '1,2,3,4,5,a', '1,2,3,4,5, ', '1,2,3,4,5,-1'])(
    '숫자가 아닌 문자가 포함되면 에러가 발생한다.',
    text => {
      expect(() => validateWinningNumbers(text)).toThrow(VALIDATE_ONLY_NUMBER_ERROR.NOT_NUMBER);
    },
  );

  test.each(['1,2,3,4,5,0', '1,2,3,4,5,46', '0,2,3,4,5,6'])(
    `${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER}사이의 숫자가 아니면 에러가 발생한다.`,
    text => {
      expect(() => validateWinningNumbers(text)).toThrow(VALIDATE_WINNING_NUMBERS_ERROR.NOT_IN_RANGE);
    },
  );

  test.each(['1,1,3,4,5,6', '1,2,2,4,5,6', '1,1,1,1,1,1', '45,45,45,45,45,45'])(
    '중복되는 숫자가 존재하면 에러가 발생한다.',
    text => {
      expect(() => validateWinningNumbers(text)).toThrow(VALIDATE_WINNING_NUMBERS_ERROR.DUPLICATED);
    },
  );
});
