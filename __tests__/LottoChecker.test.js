import { LOTTO_REWARD_CODE } from '../src/js/constants/lotto-config.js';
import Lotto from '../src/js/domain/Lotto.js';
import LottoChecker from '../src/js/domain/LottoChecker.js';

const DEFAULT_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

describe('로또 등수 확인 테스트', () => {
  it('로또는 당첨번호와 보너스 번호를 입력받으면 자신의 등수를 알 수 있다.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(DEFAULT_LOTTO_NUMBERS, 9);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 1,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });
  });

  it('2등 테스트.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check([1, 2, 3, 4, 5, 8], 6);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 1,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });
  });

  it('3등 테스트.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check([1, 2, 3, 4, 5, 0], 0);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 1,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });
  });

  it('4등 테스트.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check([1, 2, 3, 4, 0, 0], 0);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 1,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });
  });

  it('5등 테스트.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check([1, 2, 3, 0, 0, 0], 0);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 1,
    });
  });

  it.each([
    [1, 2, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ])('낙첨 테스트.', (...winningNumber) => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(winningNumber, 0);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });
  });
});
