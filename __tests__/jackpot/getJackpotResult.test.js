import { getJackpotResult } from '../../src/domains/jackpot/utils';

describe('getJackpotResult 관련 함수', () => {
  describe('구매한 로또 번호와 당첨 번호를 비교했을 때', () => {
    const DEFAULT_ORDERED_NUMBERS = [1, 2, 3, 4, 5, 6];
    const DEFAULT_BONUS_NUMBER = 7;

    test.each([
      {
        description: '일반 숫자 6개가 일치하여 1등이다.',
        expected: 1,
        jackpot: DEFAULT_ORDERED_NUMBERS,
        bonus: DEFAULT_BONUS_NUMBER,
      },
      {
        description: '일반 숫자 5개랑 보너스 번호가 일치하여 2등이다.',
        expected: 2,
        jackpot: [1, 2, 3, 4, 5, 7],
        bonus: DEFAULT_BONUS_NUMBER - 1,
      },
      {
        description: '일반 숫자 5개가 일치하여 3등이다.',
        expected: 3,
        jackpot: [1, 2, 3, 4, 5, 7],
        bonus: DEFAULT_BONUS_NUMBER,
      },
      {
        description: '일반 숫자 4개가 일치하여 4등이다.',
        expected: 4,
        jackpot: [1, 2, 3, 4, 7, 8],
        bonus: DEFAULT_BONUS_NUMBER,
      },
      {
        description: '일반 숫자 3개가 일치하여 5등이다.',
        expected: 5,
        jackpot: [1, 2, 3, 7, 8, 9],
        bonus: DEFAULT_BONUS_NUMBER,
      },
      {
        description:
          '일반 숫자 2개가 일치하지만 등수에 포함 안되어 "0"을 반환한다.',
        expected: 0,
        jackpot: [1, 2, 7, 8, 9, 10],
        bonus: DEFAULT_BONUS_NUMBER,
      },
    ])('$description', ({ expected, jackpot, bonus }) => {
      const { rank } = getJackpotResult(
        { ordered: DEFAULT_ORDERED_NUMBERS, jackpot },
        bonus,
      );
      expect(rank).toBe(expected);
    });
  });
});
