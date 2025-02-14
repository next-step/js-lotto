import { getProfitRate } from '../../src/domains/statistics/utils';

describe('getProfitRate 관련 함수', () => {
  test('총 5,000원 어치를 구매하고 5,000,000원 당첨되었으면 수익률이 900%이다.', () => {
    const profitRate = getProfitRate(5000, 50_000);

    expect(profitRate).toBe(900);
  });

  test('총 5,000원 어치를 구매하고 5,000원 당첨되었으면 수익률이 0%이다.', () => {
    const profitRate = getProfitRate(5000, 5000);

    expect(profitRate).toBe(0);
  });

  test('총 10,000원 어치를 구매하고 0원 당첨되었으면 수익률이 -100%이다.', () => {
    const profitRate = getProfitRate(10_000, 0);

    expect(profitRate).toBe(-100);
  });
});
