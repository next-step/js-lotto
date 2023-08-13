import {VALIDATE_BONUS_NUMBER_ERROR, validateBonusNumber} from '../validateBonusNumber';
import {VALIDATE_ONLY_NUMBER_ERROR} from '../../utils/validateOnlyNumber';

describe('validateBonusNumber function', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  test.each(['7', '8', '45'])('문자열은 1~45 사이의 당첨번호와 중복되지 않는 숫자이다.', text => {
    expect(() => validateBonusNumber(text, winningNumbers)).not.toThrow();
  });

  test.each(['a', '', ' ', '-', '1a'])('문자열이 숫자가 아니면 에러가 발생한다.', text => {
    expect(() => validateBonusNumber(text, winningNumbers)).toThrow(VALIDATE_ONLY_NUMBER_ERROR.NOT_NUMBER);
  });

  test.each(['0', '46', '100'])('1~45사이의 숫자가 아니면 에러가 발생한다.', text => {
    expect(() => validateBonusNumber(text, winningNumbers)).toThrow(VALIDATE_BONUS_NUMBER_ERROR.NOT_IN_RANGE);
  });

  test.each(['1', '2', '3', '4', '5', '6'])('당첨 번호와 중복되면 에러가 발생한다.', text => {
    expect(() => validateBonusNumber(text, winningNumbers)).toThrow(
      VALIDATE_BONUS_NUMBER_ERROR.DUPLICATED_WINNING_NUMBER,
    );
  });
});
