import { getStatisticsResult } from '../../src/domains/statistics/utils';

describe('getStatisticsResult에 관한 테스트', () => {
  test.each([
    {
      description: '입력된 로또 결과를 통계 데이터로 변환할 수 있다.',
      lottoResults: [
        { isJackpot: false, rank: 0, price: 0, matchedCount: 0 },
        { isJackpot: false, rank: 0, price: 0, matchedCount: 2 },
        { isJackpot: false, rank: 0, price: 0, matchedCount: 0 },
        { isJackpot: true, rank: 5, price: 5000, matchedCount: 3 },
      ],
      expected: [
        {
          rank: 'FIRST',
          matchCount: 6,
          hasBonus: false,
          price: 2_000_000_000,
          count: 0,
        },
        {
          rank: 'SECOND',
          matchCount: 5,
          hasBonus: true,
          price: 30_000_000,
          count: 0,
        },
        {
          rank: 'THIRD',
          matchCount: 5,
          hasBonus: false,
          price: 1_500_000,
          count: 0,
        },
        {
          rank: 'FOURTH',
          matchCount: 4,
          hasBonus: false,
          price: 50_000,
          count: 0,
        },
        {
          rank: 'FIFTH',
          matchCount: 3,
          hasBonus: false,
          price: 5000,
          count: 1,
        },
      ],
    },
    {
      description: '빈 배열이 주어졌을 때, 모든 등수의 개수는 0이 된다.',
      lottoResults: [],
      expected: [
        {
          rank: 'FIRST',
          matchCount: 6,
          hasBonus: false,
          price: 2_000_000_000,
          count: 0,
        },
        {
          rank: 'SECOND',
          matchCount: 5,
          hasBonus: true,
          price: 30_000_000,
          count: 0,
        },
        {
          rank: 'THIRD',
          matchCount: 5,
          hasBonus: false,
          price: 1_500_000,
          count: 0,
        },
        {
          rank: 'FOURTH',
          matchCount: 4,
          hasBonus: false,
          price: 50_000,
          count: 0,
        },
        {
          rank: 'FIFTH',
          matchCount: 3,
          hasBonus: false,
          price: 5000,
          count: 0,
        },
      ],
    },
  ])('$description', ({ lottoResults, expected }) => {
    const result = getStatisticsResult(lottoResults);

    expect(result).toEqual(expected);
  });
});
