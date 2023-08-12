import {PRIZE_MAP} from '../constants/prizeMap';
import {getTotalBenefit} from '../getTotalBenefit';

describe('getTotalBenefit function', () => {
  test('등수 결과에 따라 총 상금을 반환한다.', () => {
    const result = {
      FIRST: 1,
      SECOND: 5,
      THIRD: 0,
      FOURTH: 3,
      FIFTH: 0,
      LOSS: 1,
    };
    expect(getTotalBenefit(result)).toBe(
      PRIZE_MAP.FIRST * result.FIRST +
        PRIZE_MAP.SECOND * result.SECOND +
        PRIZE_MAP.THIRD * result.THIRD +
        PRIZE_MAP.FOURTH * result.FOURTH +
        PRIZE_MAP.FIFTH * result.FIFTH +
        PRIZE_MAP.LOSS * result.LOSS,
    );
  });
});
