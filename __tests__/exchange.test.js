import { LOTTO_REWARD_CODE, LOTTO_REWARD_CONDITION } from '../src/js/constants/lotto-config.js';
import Exchange from '../src/js/domain/Exchange.js';
import Lotto from '../src/js/domain/Lotto.js';
import LottoChecker from '../src/js/domain/LottoChecker.js';
import { DEFAULT_LOTTO_NUMBERS, LOTTO_REWARD_DUMMY, MATCHED_BONUS } from './constants/lotto.js';

describe('교환소 테스트', () => {
  it('로또의 등수에 따라 당첨금을 반환한다', () => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    const lottoChecker = new LottoChecker();

    lotto.check(LOTTO_REWARD_DUMMY.SECOND, MATCHED_BONUS);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    const prize = Exchange.getLottoPrize(lottoRewardBoard);

    expect(prize).toBe(LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.SECOND].prize);
  });

  it.each([
    {
      investment: 10000,
      proceeds: 1000,
      result: '10.0',
    },
    {
      investment: 2000,
      proceeds: 6000,
      result: '300.0',
    },
    {
      investment: 3,
      proceeds: 1,
      result: '33.3',
    },
  ])('수익률을 계산한다', ({ investment, proceeds, result }) => {
    const exchange = new Exchange();
    const rateOfReturn = exchange.calculateRateOfReturn(investment, proceeds);

    expect(rateOfReturn).toBe(result);
  });
});
