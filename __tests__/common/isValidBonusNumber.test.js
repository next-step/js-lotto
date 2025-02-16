import { isValidBonusNumber } from '../../src/domains/common/utils';

describe('validateBonusNumber에 관한 함수', () => {
  const DEFAULT_JACKPOT_NUMBERS = [1, 2, 3, 4, 5, 6];

  describe('로또 숫자 범위가 1 ~ 45까지일 경우, 보너스 번호가', () => {
    test('보너스 번호가 0이면 false를 반환한다.', () => {
      const valid = isValidBonusNumber(0, DEFAULT_JACKPOT_NUMBERS);

      expect(valid).toBe(false);
    });
    test('보너스 번호가 46이면 false를 반환한다.', () => {
      const valid = isValidBonusNumber(46, DEFAULT_JACKPOT_NUMBERS);

      expect(valid).toBe(false);
    });
  });

  test('보너스 번호가 당첨 숫자 중 중복일 경우, false를 반환한다.', () => {
    const valid = isValidBonusNumber(6, DEFAULT_JACKPOT_NUMBERS);

    expect(valid).toBe(false);
  });

  test('보너스 번호가 당첨 숫자 중 중복이 아니며 로또 숫자 범위에 포함되어 있으면 true를 반환한다.', () => {
    const valid = isValidBonusNumber(7, DEFAULT_JACKPOT_NUMBERS);

    expect(valid).toBe(true);
  });
});
