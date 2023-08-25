import { Lotto, LottoReward, WinningLotto } from '../../src/js/domain/index.js';

describe('로또 상금 테스트', () => {
  it('6개가 동일할시 상금은 2,000,000,000원이다.', () => {
    const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const { match, prize } = LottoReward.getLottoReward(lotto, winningLotto);

    expect(match).toBe(LottoReward.FIRST.match);
    expect(prize).toBe(LottoReward.FIRST.prize);
  });

  it('5개와 보너스번호가 동일할시 상금은 30,000,000원이다.', () => {
    const lotto = Lotto.of([1, 2, 3, 4, 5, 7]);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const { match, prize } = LottoReward.getLottoReward(lotto, winningLotto);

    expect(match).toBe(LottoReward.SECOND.match);
    expect(prize).toBe(LottoReward.SECOND.prize);
  });

  it('5개가 동일하고 보너스번호가 다를시 상금은 1,500,000원이다.', () => {
    const lotto = Lotto.of([1, 2, 3, 4, 5, 9]);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const { match, prize } = LottoReward.getLottoReward(lotto, winningLotto);

    expect(match).toBe(LottoReward.THIRD.match);
    expect(prize).toBe(LottoReward.THIRD.prize);
  });

  it('4개가 동일할시 상금은 50,000원이다.', () => {
    const lotto = Lotto.of([1, 2, 3, 4, 8, 9]);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const { match, prize } = LottoReward.getLottoReward(lotto, winningLotto);

    expect(match).toBe(LottoReward.FOURTH.match);
    expect(prize).toBe(LottoReward.FOURTH.prize);
  });

  it('3개가 동일할시 상금은 5,000원이다.', () => {
    const lotto = Lotto.of([1, 2, 3, 8, 9, 10]);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const { match, prize } = LottoReward.getLottoReward(lotto, winningLotto);

    expect(match).toBe(LottoReward.FIFTH.match);
    expect(prize).toBe(LottoReward.FIFTH.prize);
  });

  it.each([
    {
      numbers: [1, 2, 13, 14, 15, 16],
    },
    {
      numbers: [1, 12, 13, 14, 15, 16],
    },
    {
      numbers: [11, 12, 13, 14, 15, 16],
    },
  ])('2개 이하로 동일할시 낙첨이다.', ({ numbers }) => {
    const lotto = Lotto.of(numbers);
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const reward = LottoReward.getLottoReward(lotto, winningLotto);

    expect(reward).toBeUndefined();
  });
});
