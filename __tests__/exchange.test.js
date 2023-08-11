import { LOTTO_PRIZE_TABLE } from '../src/js/constants/lotto-config.js';
import Exchange from '../src/js/domain/Exchange.js';
import Lotto from '../src/js/domain/Lotto.js';

describe('교환소 테스트', () => {
  it('로또의 등수에 따라 당첨금을 반환한다', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [1, 2, 3, 4, 5, 7];
    const bonus = 6;

    lotto.check(winningNumbers, bonus);

    const exchange = new Exchange();
    const prize = exchange.getLottoPrize(lotto);

    expect(prize).toBe(LOTTO_PRIZE_TABLE['2']);
  });

  it('수익률을 계산한다', () => {
    const rateOfReturn = Exchange.calculateRateOfReturn(10000, 1000);

    expect(rateOfReturn).toBe(10);
  });
});
