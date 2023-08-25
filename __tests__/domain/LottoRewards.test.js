import { Lotto, LottoRewards, RANK_KEY, WinningLotto } from '../../src/js/domain/index.js';

const repeatLotto = (item, count) => Array(count).fill(item);

const findRank = (list, key) => list.find(({ reward }) => reward.key === key);

describe('로또 상금 목록 테스트', () => {
  it('로또 상금 목록은 로또들의 최종 결과를 반환한다.', () => {
    const bonus = 7;

    const first = new Lotto([1, 2, 3, 4, 5, 6]);
    const firstQuantity = 2;

    const second = new Lotto([1, 2, 3, 4, 5, bonus]);
    const secondQuantity = 4;

    const third = new Lotto([1, 2, 3, 4, 5, 8]);
    const thirdQuantity = 6;

    const fourth = new Lotto([1, 2, 3, 4, 7, 8]);
    const fourthQuantity = 1;

    const fifth = new Lotto([1, 2, 3, 7, 8, 9]);
    const fifthQuantity = 3;

    const lost = new Lotto([1, 2, 7, 8, 9, 10]);

    const winningLotto = new WinningLotto(first, bonus);

    const lottos = [
      repeatLotto(first, firstQuantity),
      repeatLotto(second, secondQuantity),
      repeatLotto(third, thirdQuantity),
      repeatLotto(fourth, fourthQuantity),
      repeatLotto(fifth, fifthQuantity),
      lost,
    ].flat();

    const lottoRewards = new LottoRewards(lottos, winningLotto);

    const rankList = lottoRewards.getRankList();

    expect(findRank(rankList, RANK_KEY.FIRST).quantity).toBe(firstQuantity);
    expect(findRank(rankList, RANK_KEY.SECOND).quantity).toBe(secondQuantity);
    expect(findRank(rankList, RANK_KEY.THIRD).quantity).toBe(thirdQuantity);
    expect(findRank(rankList, RANK_KEY.FOURTH).quantity).toBe(fourthQuantity);
    expect(findRank(rankList, RANK_KEY.FIFTH).quantity).toBe(fifthQuantity);
  });

  it.each([
    {
      lotto: [1, 2, 3, 4, 5, 6],
      result: 200000000.0,
    },
    {
      lotto: [10, 11, 12, 13, 14, 15],
      result: 0.0,
    },
  ])('수익률을 계산한다.', ({ lotto, result }) => {
    const lottos = [new Lotto(lotto)];
    const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
    const lottoRewards = new LottoRewards(lottos, winningLotto);
    const proceed = 1_000;
    const rateOfReturn = lottoRewards.getRateOfReturn(proceed);

    expect(rateOfReturn).toBe(result);
  });
});
