import { LOTTO_REWARD_CODE, LOTTO_REWARD } from '../src/js/constants/lotto-config.js';
import { Exchange, Lotto, LottoChecker } from '../src/js/domain/index.js';
import { DEFAULT_LOTTO_NUMBERS, LOTTO_REWARD_DUMMY, MATCHED_BONUS, UNMATCHED_BONUS } from './constants/lotto.js';

describe('교환소 테스트', () => {
  it.each([
    {
      numbers: LOTTO_REWARD_DUMMY.FIRST,
      bonus: MATCHED_BONUS,
      prize: LOTTO_REWARD[LOTTO_REWARD_CODE.FIRST].prize,
    },
    {
      numbers: LOTTO_REWARD_DUMMY.SECOND,
      bonus: MATCHED_BONUS,
      prize: LOTTO_REWARD[LOTTO_REWARD_CODE.SECOND].prize,
    },
    {
      numbers: LOTTO_REWARD_DUMMY.THIRD,
      bonus: UNMATCHED_BONUS,
      prize: LOTTO_REWARD[LOTTO_REWARD_CODE.THIRD].prize,
    },
    {
      numbers: LOTTO_REWARD_DUMMY.FOURTH,
      bonus: MATCHED_BONUS,
      prize: LOTTO_REWARD[LOTTO_REWARD_CODE.FOURTH].prize,
    },
    {
      numbers: LOTTO_REWARD_DUMMY.FIFTH,
      bonus: MATCHED_BONUS,
      prize: LOTTO_REWARD[LOTTO_REWARD_CODE.FIFTH].prize,
    },
    {
      numbers: LOTTO_REWARD_DUMMY.LOST,
      bonus: MATCHED_BONUS,
      prize: 0,
    },
  ])('로또의 등수에 따라 당첨금을 반환한다', ({ numbers, bonus, prize }) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    const lottoChecker = new LottoChecker();

    lotto.check(numbers, bonus);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    const result = Exchange.getLottoPrize(lottoRewardBoard);

    expect(result).toBe(prize);
  });

  it('다수의 로또 당첨금을 한번에 반환한다', () => {
    const first = new Lotto(DEFAULT_LOTTO_NUMBERS);
    const second = new Lotto(DEFAULT_LOTTO_NUMBERS);
    const lottoChecker = new LottoChecker();

    first.check(LOTTO_REWARD_DUMMY.FIRST, MATCHED_BONUS);
    second.check(LOTTO_REWARD_DUMMY.SECOND, MATCHED_BONUS);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([first, second]);

    const prize = Exchange.getLottoPrize(lottoRewardBoard);

    expect(prize).toBe(LOTTO_REWARD[LOTTO_REWARD_CODE.FIRST].prize + LOTTO_REWARD[LOTTO_REWARD_CODE.SECOND].prize);
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
  ])('수익률을 계산한다', ({ investment, proceeds, result }) => {
    const exchange = new Exchange();
    const rateOfReturn = exchange.calculateRateOfReturn(investment, proceeds);

    expect(rateOfReturn).toBe(result);
  });
});
