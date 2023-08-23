import {
  FifthPrize,
  FirstPrize,
  FourthPrize,
  LottoPrize,
  SecondPrize,
  ThirdPrize,
} from '../../src/js/domain/LottoPrize/index.js';
import { Exchange } from '../../src/js/domain/index.js';

describe('교환소 테스트', () => {
  it('다수의 로또 당첨금을 한번에 반환한다', () => {
    const prizes = [
      new FirstPrize(),
      new SecondPrize(),
      new ThirdPrize(),
      new FourthPrize(),
      new FifthPrize(),
      new LottoPrize(),
    ];

    expect(Exchange.getTotalPrize(prizes)).toBe(2031555000);
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
