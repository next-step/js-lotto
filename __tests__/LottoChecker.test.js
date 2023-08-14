import { LOTTO_REWARD_CODE } from '../src/js/constants/lotto-config.js';
import Lotto from '../src/js/domain/Lotto.js';
import LottoChecker from '../src/js/domain/LottoChecker.js';
import {
  DEFAULT_LOTTO_NUMBERS,
  LOTTO_REWARD_DUMMY,
  MATCHED_BONUS,
  UNMATCHED_BONUS,
} from './constants/lotto.js';

describe('로또 등수 확인 테스트', () => {
  it('로또는 당첨번호와 보너스 번호를 입력받으면 자신의 등수를 알 수 있다.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(DEFAULT_LOTTO_NUMBERS, MATCHED_BONUS);

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
    lotto.check(LOTTO_REWARD_DUMMY.SECOND, MATCHED_BONUS);

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
    lotto.check(LOTTO_REWARD_DUMMY.THIRD, UNMATCHED_BONUS);

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
    lotto.check(LOTTO_REWARD_DUMMY.FOURTH, MATCHED_BONUS);

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
    lotto.check(LOTTO_REWARD_DUMMY.FIFTH, MATCHED_BONUS);

    const lottoRewardBoard = lottoChecker.getLottoRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 0,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 1,
    });
  });

  it('낙첨 테스트.', () => {
    const lottoChecker = new LottoChecker();

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(LOTTO_REWARD_DUMMY.LOST, MATCHED_BONUS);

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
