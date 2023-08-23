import { Exchange, LottoReward } from '../../src/js/domain/index.js';

describe('교환소 테스트', () => {
  it('다수의 로또 당첨금을 한번에 반환한다', () => {
    const prizes = [new LottoReward(6, 2_000_000_000), new LottoReward(5, 30_000_000)];

    expect(Exchange.getTotalPrize(prizes)).toBe(2030000000);
  });

  it.each([
    {
      investment: 10000,
      proceeds: 1000,
      result: 10.0,
    },
    {
      investment: 2000,
      proceeds: 6000,
      result: 300.0,
    },
    {
      investment: 3,
      proceeds: 1,
      result: 33.3,
    },
    {
      investment: 10000,
      proceeds: 0,
      result: 0.0,
    },
  ])('지출이 $investment원이고 수익이 $proceeds원일떼 수익률은 $result%이다.', ({ investment, proceeds, result }) => {
    const exchange = new Exchange();
    const rateOfReturn = exchange.calculateRateOfReturn(investment, proceeds);

    expect(rateOfReturn).toBe(result);
  });
});
