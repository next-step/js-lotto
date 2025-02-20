import { LOTTO } from '../../src/domains/common/constants';
import { getLotto } from '../../src/domains/common/utils';

describe('getLotto 관련 함수 테스트', () => {
  describe('보유한 로또 숫자를 매개변수로 입력했을 때', () => {
    test.each([
      {
        numbers: [1, 2, 3, 5, 5, 6],
        error: '중복된 숫자가 있으면 오류를 던진다.',
      },
      {
        numbers: [1, 2, 3, 4, 5, 50],
        error: '로또 범위(1 ~ 45)를 벗어난 숫자가 있으면 오류를 던진다.',
      },
    ])('$error', ({ numbers }) => {
      expect(() => getLotto(numbers)).toThrow();
    });
  });

  describe('값이 출력되었을 때', () => {
    test.each([
      {
        description: '6개의 일반 숫자가 나와야 한다.',
        numbers: [1, 2, 3, 4, 5, 6],
      },
      {
        description: '6개의 랜덤 숫자가 나와야 한다.',
        numbers: [10, 15, 23, 31, 40, 42],
      },
      {
        description: '6개의 서로 다른 숫자가 나와야 한다.',
        numbers: [5, 12, 18, 22, 34, 45],
      },
    ])('$description', ({ numbers }) => {
      const lotto = getLotto(numbers);

      expect(lotto.length).toBe(LOTTO.SIZE);
      expect(new Set(lotto).size).toBe(LOTTO.SIZE);
      expect(lotto.every((num) => num >= 1 && num <= 45)).toBe(true);
    });
  });
});
