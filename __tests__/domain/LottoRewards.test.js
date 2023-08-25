import { Lotto, LottoRewards, RANK_KEY, WinningLotto } from '../../src/js/domain/index.js';

const repeatLotto = (item, count) => Array(count).fill(item);

const findRank = (list, key) => list.find(({ reward }) => reward.key === key);

describe('로또 상금 목록 테스트', () => {
  it('로또 상금 목록은 로또들의 최종 결과를 반환한다.', () => {
    const bonus = 7;

    const first = Lotto.of([1, 2, 3, 4, 5, 6]);
    const firstQuantity = 2;

    const second = Lotto.of([1, 2, 3, 4, 5, bonus]);
    const secondQuantity = 4;

    const third = Lotto.of([1, 2, 3, 4, 5, 8]);
    const thirdQuantity = 6;

    const fourth = Lotto.of([1, 2, 3, 4, 7, 8]);
    const fourthQuantity = 1;

    const fifth = Lotto.of([1, 2, 3, 7, 8, 9]);
    const fifthQuantity = 3;

    const lost = Lotto.of([1, 2, 7, 8, 9, 10]);

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
      lottos: [Lotto.of([1, 2, 3, 4, 5, 6])],
      proceed: 1_000,
      result: 200000000.0,
    },
    {
      lottos: [
        Lotto.of([1, 2, 3, 8, 9, 10]), // 5등
        Lotto.of([1, 2, 3, 10, 11, 12]), // 5등
        Lotto.of([1, 2, 3, 4, 9, 10]), // 4등
        Lotto.of([11, 12, 13, 14, 15, 16]), // 낙첨 총 수익 60,000원 수익률 = 60,000 / 10,000 = 60
      ],
      proceed: 10_000,
      result: 600.0,
    },
    {
      lottos: [
        Lotto.of([1, 2, 3, 8, 9, 10]), // 5등
        Lotto.of([1, 2, 3, 10, 11, 12]), // 5등 총 수익 10,000원 수익률 = 10,000 / 30,000 = 33.3
      ],
      proceed: 30_000,
      result: 33.3,
    },
    {
      lottos: [Lotto.of([10, 11, 12, 13, 14, 15])],
      proceed: 1_000,
      result: 0.0,
    },
  ])('수익률을 계산한다.', ({ lottos, result, proceed }) => {
    const winningLotto = new WinningLotto(Lotto.of([1, 2, 3, 4, 5, 6]), 7);
    const lottoRewards = new LottoRewards(lottos, winningLotto);
    const rateOfReturn = lottoRewards.computeRateOfReturn(proceed);

    expect(rateOfReturn).toBe(result);
  });
});
