import ERROR from '../../src/js/constants/error.js';
import { LOTTO_NUMBER_RANGE } from '../../src/js/constants/lotto-config.js';
import checkValidBonus from '../../src/js/validator/bonus.js';
import { DEFAULT_LOTTO_NUMBERS } from '../constants/lotto.js';

describe('보너스 번호 유효성 테스트', () => {
  it.each([{ bonus: 10 }, { bonus: 13 }, { bonus: 7 }, { bonus: 45 }])(
    `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위 내인 $bonus를 입력할 시 에러가 발생하지 않는다.`,
    ({ bonus }) => {
      expect(() => {
        checkValidBonus(bonus, DEFAULT_LOTTO_NUMBERS);
      }).not.toThrow();
    }
  );

  it.each([{ bonus: 0 }, { bonus: -4 }, { bonus: 46 }, { bonus: '한글' }])(
    `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위를 벗어난 $bonus를 입력할 시 에러가 발생한다.`,
    ({ bonus }) => {
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
