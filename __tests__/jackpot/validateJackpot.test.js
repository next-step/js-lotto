import { validateJackpot } from '../../src/domains/jackpot/utils';

describe('validateJackpot 관련 함수', () => {
  describe('당첨 숫자들의 총 개수를 판별할 때', () => {
    test.each([
      ['6개이면 유효성 통과로 true를 반환한다.', [1, 2, 3, 4, 5, 6], true],
      [
        '5개 이하이면 통과를 못하게 되어 false를 반환한다.',
        [1, 2, 3, 4, 5],
        false,
      ],
      [
        '6개 초과이면 통과를 못하게 되어 false를 반환한다.',
        [1, 2, 3, 4, 5, 6, 7],
        false,
      ],
    ])('%s', (_, numbers, expected) => {
      const isValid = validateJackpot(numbers);

      expect(isValid).toBe(expected);
    });
  });

  test('6개의 숫자들 중 로또 범위가 아닌 숫자가 포함되어 있을 경우, false를 반환한다.', () => {
    const isValid = validateJackpot([1, 2, 3, 4, 5, 46]);

    expect(isValid).toBe(false);
  });
});
