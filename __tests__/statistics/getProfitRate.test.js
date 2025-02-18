import { getProfitRate } from '../../src/domains/statistics/utils';

describe('getProfitRate 관련 함수', () => {
  test.each([
    {
      description:
        '총 5,000원 어치를 구매하고 50,000원 당첨되었으면 수익률이 900%이다.',
      initialAmount: 5000,
      finalAmount: 50_000,
      expected: 900,
    },
    {
      description:
        '총 5,000원 어치를 구매하고 5,000원 당첨되었으면 수익률이 0%이다.',
      initialAmount: 5000,
      finalAmount: 5000,
      expected: 0,
    },
    {
      description:
        '총 10,000원 어치를 구매하고 0원 당첨되었으면 수익률이 -100%이다.',
      initialAmount: 10_000,
      finalAmount: 0,
      expected: -100,
    },
    {
      description:
        '수익률에 소수점이 발생되면 첫째 자리까지만 내림 상태로 반환한다.',
      initialAmount: 1130,
      finalAmount: 1134,
      expected: 0.3,
    },
  ])('$description', ({ initialAmount, finalAmount, expected }) => {
    expect(getProfitRate(initialAmount, finalAmount)).toBe(expected);
  });
});
