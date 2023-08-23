import { LottoReward } from '../../src/js/domain/index.js';

describe('로또 상금 목록 테스트', () => {
  it('총 상금액을 반환한다.', () => {
    const lottoRewards = new LottoRewards([new LottoReward(6, 2_000_000_000), new LottoReward(5, 30_000_000)]);

    expect(Exchange.totalPrize).toBe(2_030_000000);
  });

  it.each([
    {
      proceeds: 1000,
      result: 10.0,
    },
    {
      proceeds: 60000,
      result: 300.0,
    },
    {
      proceeds: 3000,
      result: 33.3,
    },
    {
      proceeds: 0,
      result: 0.0,
    },
  ])('지출이 $investment원이고 수익이 $proceeds원일떼 수익률은 $result%이다.', ({ proceeds, result }) => {
    const lottoRewards = new LottoRewards([new LottoReward(3, 5_000), new LottoReward(3, 5_000)]);
    const rateOfReturn = lottoRewards.calculateRateOfReturn(proceeds);

    expect(rateOfReturn).toBe(result);
  });
});
