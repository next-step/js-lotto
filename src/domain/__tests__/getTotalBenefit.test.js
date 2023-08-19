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
    const totalBenefit = 2_150_150_000;

    expect(getTotalBenefit(result)).toBe(totalBenefit);
  });
});
