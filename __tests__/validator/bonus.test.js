import ERROR from '../../src/js/constants/error.js';
import { LOTTO_NUMBER_RANGE } from '../../src/js/constants/lotto-config.js';
import { DEFAULT_LOTTO_NUMBERS } from '../constants/lotto.js';

describe('보너스 번호 예외 테스트', () => {
  it.each([0, -3, 48, '한글'])(
    `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위를 벗어난 숫자를 입력할 시 에러가 발생한다.`,
    (bonus) => {
      expect(() => {
        checkValidBonus(bonus, DEFAULT_LOTTO_NUMBERS);
      }).toThrow(ERROR.NUMBER.BEYOND_NUMBER_RANGE);
    }
  );

  it('당첨번호와 중복된 숫자를 입력할 시 에러가 발생한다.', () => {
    expect(() => {
      checkValidBonus(DEFAULT_LOTTO_NUMBERS[0], DEFAULT_LOTTO_NUMBERS);
    }).toThrow(ERROR.BONUS.DUPLICATED_WITH_WINNING_NUMBER);
  });
});
