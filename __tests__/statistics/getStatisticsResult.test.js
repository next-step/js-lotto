import { getStatisticsResult } from '../../src/domains/statistics/utils';

describe('getStatisticsResult에 관한 테스트', () => {
  describe('각 로또에 대한 결과를 통계 자료로 가공했을 때', () => {
    test('5등 10,000원 2개, 3등 1,500,000원 1개로 데이터 출력할 수 있다.', () => {
      const result = getStatisticsResult([
        { isJackpot: true, rank: 5, price: 5000, matchedCount: 3 },
        { isJackpot: false, rank: 0, price: 0, matchedCount: 2 },
        { isJackpot: true, rank: 5, price: 5000, matchedCount: 3 },
        { isJackpot: true, rank: 3, price: 1_500_000, matchedCount: 5 },
      ]);

      expect(result).toEqual({
        FIRST: { count: 0, amount: 0 },
        SECOND: { count: 0, amount: 0 },
        THIRD: { count: 1, amount: 1_500_000 },
        FOURTH: { count: 0, amount: 0 },
        FIFTH: { count: 2, amount: 10_000 },
      });
    });
  });

  test('빈 배열은 1등부터 5등까지 모두 0원, 0개로 출력된다.', () => {
    const result = getStatisticsResult([]);

    expect(result).toEqual({
      FIRST: { count: 0, amount: 0 },
      SECOND: { count: 0, amount: 0 },
      THIRD: { count: 0, amount: 0 },
      FOURTH: { count: 0, amount: 0 },
      FIFTH: { count: 0, amount: 0 },
    });
  });
});
