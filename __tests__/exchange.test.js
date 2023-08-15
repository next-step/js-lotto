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

    const exchange = new Exchange();

    const prize = exchange.getLottoPrize(lottoRewardBoard);

    expect(prize).toBe(LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.SECOND].prize);
  });

  it('수익률을 계산한다', () => {
    const rateOfReturn = Exchange.calculateRateOfReturn(10000, 1000);

    expect(rateOfReturn).toBe(10);
  });
});
