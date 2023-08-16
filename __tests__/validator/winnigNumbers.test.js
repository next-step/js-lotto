import ERROR from '../../src/js/constants/error.js';
import { LOTTO_NUMBER_QUANTITY, LOTTO_NUMBER_RANGE } from '../../src/js/constants/lotto-config.js';
import checkValidWinningNumbers from '../../src/js/validator/winningNumbers.js';

describe('당첨 번호 예외 테스트', () => {
  it.each([
    [1, 2, 3, 4, 5],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6, 7],
  ])(`${LOTTO_NUMBER_QUANTITY}개가 아닌 숫자를 입력할 시 에러가 발생한다.`, (...winningNumbers) => {
    expect(() => {
      checkValidWinningNumbers([...winningNumbers]);
    }).toThrow(ERROR.WINNING_NUMBERS.UNMATCHED_QUANTITY);
  });

  it.each([
    [0, 1, 2, 3, 4, 5],
    [-1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 46],
    ['한글', 1, 2, 3, 4, 5],
  ])(
    `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위를 벗어난 숫자를 입력할 시 에러가 발생한다.`,
    (...winningNumbers) => {
      expect(() => {
        checkValidWinningNumbers([...winningNumbers]);
      }).toThrow(ERROR.WINNING_NUMBERS.BEYOND_NUMBER_RANGE);
    }
  );

  it('중복된 숫자를 입력할 시 에러가 발생한다.', () => {
    expect(() => {
      checkValidWinningNumbers([1, 2, 3, 4, 5, 1]);
    }).toThrow(ERROR.WINNING_NUMBERS.DO_NOT_ENTER_DUPLICATED_NUMBER);
  });
});
