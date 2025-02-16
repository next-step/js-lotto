import { getProfitRate } from '../../src/domains/statistics/utils';

describe('getProfitRate 관련 함수', () => {
  test.each([
    [
      '총 5,000원 어치를 구매하고 50,000원 당첨되었으면 수익률이 900%이다.',
      5000,
      50_000,
      900,
    ],
    [
      '총 5,000원 어치를 구매하고 5,000원 당첨되었으면 수익률이 0%이다.',
      5000,
      5000,
      0,
    ],
    [
      '총 10,000원 어치를 구매하고 0원 당첨되었으면 수익률이 -100%이다.',
      10_000,
      0,
      -100,
    ],
    [
      '수익률에 소수점이 발생되면 첫째 자리까지만 내림 상태로 반환한다.',
      1130,
      1134,
      0.3,
    ],
  ])('%s', (_, initialAmount, finalAmount, rate) => {
    expect(getProfitRate(initialAmount, finalAmount)).toBe(rate);
  });
});
