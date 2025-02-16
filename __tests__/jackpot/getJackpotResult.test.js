import { getJackpotResult } from '../../src/domains/jackpot/utils';

describe('getJackpotResult 관련 함수', () => {
  describe('구매한 로또 번호와 당첨 번호를 비교했을 때', () => {
    const DEFAULT_ORDERED_NUMBERS = [1, 2, 3, 4, 5, 6];
    const DEFAULT_BONUS_NUMBER = 7;

    test.each([
      [
        '일반 숫자 6개가 일치하여 1등이다.',
        1,
        DEFAULT_ORDERED_NUMBERS,
        DEFAULT_ORDERED_NUMBERS,
        DEFAULT_BONUS_NUMBER,
      ],
      [
        '일반 숫자 5개랑 보너스 번호가 일치하여 2등이다.',
        2,
        DEFAULT_ORDERED_NUMBERS,
        [1, 2, 3, 4, 5, 7],
        DEFAULT_BONUS_NUMBER - 1,
      ],
      [
        '일반 숫자 5개가 일치하여 3등이다.',
        3,
        DEFAULT_ORDERED_NUMBERS,
        [1, 2, 3, 4, 5, 7],
        DEFAULT_BONUS_NUMBER,
      ],
      [
        '일반 숫자 4개가 일치하여 4등이다.',
        4,
        DEFAULT_ORDERED_NUMBERS,
        [1, 2, 3, 4, 7, 8],
        DEFAULT_BONUS_NUMBER,
      ],
      [
        '일반 숫자 3개가 일치하여 5등이다.',
        5,
        DEFAULT_ORDERED_NUMBERS,
        [1, 2, 3, 7, 8, 9],
        DEFAULT_BONUS_NUMBER,
      ],
      [
        '일반 숫자 2개가 일치하지만 등수에 포함 안되어 "0"을 반환한다.',
        0,
        DEFAULT_ORDERED_NUMBERS,
        [1, 2, 7, 8, 9, 10],
        DEFAULT_BONUS_NUMBER,
      ],
    ])('%s', (_, expectedRank, ordered, jackpot, bonus) => {
      const { rank } = getJackpotResult({ ordered, jackpot }, bonus);
      expect(rank).toBe(expectedRank);
    });
  });
});
