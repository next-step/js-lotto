import Lotto from '../src/js/domain/Lotto.js';

const DEFAULT_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

describe('로또 등수 확인 테스트', () => {
  it('로또는 당첨번호와 보너스 번호를 입력받으면 자신의 등수를 알 수 있다.', () => {
    const lottoChecker = new LottoChecker();
    lottoChecker.setWinningNumbers([1, 2, 3, 4, 5, 6], 9);

    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    const lottoRewardBoard = lottoChecker.getRewardBoard([lotto]);

    expect(lottoRewardBoard).toEqual({
      MATCH_3: 0,
      MATCH_4: 0,
      MATCH_5: 0,
      MATCH_5_WITH_BONUS: 0,
      MATCH_6: 1,
    });
  });
});
